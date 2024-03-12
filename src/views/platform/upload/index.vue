<template>
  <div class="upload">
    <el-card class="uploadvideo">
      <!-- 注意这里的 action="#"，和:auto-upload="false"，如果:auto-upload="true"，由于el-upload的change事件，上传和上传成功都会回调，这里
           将其设置为false，不自动上传，不然会重复请求。 :show-file-list="true"是否展示文件列表，如果不需要就设置为false就可以了，
           v-model:file-list="fileList"文件列表数组，具体看官网就行了, accept=".mp4"接收的文件类型，这里只接受mp4，可以填多个如：accept=".mp4, mp3, .jpg" -->
      <el-upload class="upload-demo" action="#" accept=".mp4" drag multiple :auto-upload="false" :show-file-list="true"
        v-model:file-list="fileList" :on-change="handleChange">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件到这里或者<em>点击上传</em>
        </div>
        <template #tip>
        </template>
      </el-upload>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="视频标题">

          <template #="{ row, $index }">
            <span v-show="!row.isEdit" @click="toEdit(row)">{{ row.videoTitle }}</span>
            <el-input v-show="row.isEdit" @blur="toLook(row)" v-model="row.videoTitle"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="视频名字" />
        <el-table-column prop="percentage" label="进度">

          <template #default="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percentage" />
          </template>
        </el-table-column>
        <el-table-column prop="percentage" label="操作">

          <template #default="scope">
            <el-button type="primary" @click="handleRemoveUploadFileList(scope.row)">删除</el-button>
            <el-button type="primary" @click="handlePreviewUploadFileList(scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog v-model="dialogTableVisible" title="预览视频" @close="handleClose">
        <video v-if="dialogTableVisible" width="800" height="600" controls loop id="video-play">
          <source :src="videoPath" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
      </el-dialog>
    </el-card>
    <el-card class="formcard">
      <div class="title">基本设置</div>
      <el-form class="form">
        <el-form-item label="封面" label-width="80">
          <el-upload class="avatar-uploader" action="/api/video/img" :show-file-list="false"
            :on-success="handleCoverSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" label-width="80">
          <el-input placeholder="请输入标题" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="分区" label-width="80">
          <el-select style="width: 200px;" v-model="partitionAndSubPartition">
            <el-option :label="item.subPartition" :value="`${item.partition}:${item.subPartition}`"
              v-for="(item, index) of partition" :key="item.subPartition">
              <span style="float: left">{{ item.subPartition }}</span>
              <span style="
          float: right;
          color: var(--el-text-color-secondary);
          font-size: 13px;
        ">{{ item.partition }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" label-width="80">
          <div class="inputtag">
            <el-tag class="tag" v-for="tag in tags" :key="tag" closable @close="closeTag(tag)">
              {{ tag }}
            </el-tag>
            <textarea type="text" @keyup.enter="addTag" v-model="tagInput"
              placeholder="输入后按下enter添加标签.不能超过20个字符"></textarea>
          </div>
        </el-form-item>
        <el-form-item label="简介" label-width="80">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" v-model="description"
            placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"></el-input>
        </el-form-item>
        <el-form-item label="定时发布" label-width="80" class="release">
          <div class="switch">
            <el-switch v-model="release" />
            <span>定时发布一经选择不支持修改/取消</span>
          </div>
          <div class="picker" v-if="release">
            <el-date-picker v-model="value1" type="date" placeholder="Pick a Date" format="YYYY-MM-DD"
              value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
            <el-time-picker v-model="value2" placeholder="Arbitrary time" value-format="hh:mm:ss" />
          </div>
        </el-form-item>
      </el-form>
      <div class="btn" style="width: 100%;display: flex;align-items: center;justify-content: center;">
        <el-button @click="submit" color="#00aeec" style="color: white;width: 160px;height: 40px;">立即投稿</el-button>
      </div>
    </el-card>

  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { UploadFilled, Plus } from '@element-plus/icons-vue'
import { type UploadProps, UploadFile, UploadFiles, ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { reqVideoSubmit, reqDelVideo } from '@/api/video'
import { reqPartition } from '@/api/partition'
import type { partitionResponseData } from '@/api/partition/type.ts'
let value1 = ref<string>('')
let value2 = ref<string>('')
let userStore = useUserStore()
let curFileName = ref<string>('')
const tableData = ref<UploadFiles>([])
// 文件列表
const fileList = ref<UploadFiles>([])
// 分块大小5MB
const chunkSize = 1024 * 1024 * 5
const dialogTableVisible = ref(false)
const videoPath = ref('')
const percentage = ref(0)
let title = ref<string>('')
const tags = ref<string[]>([])
let tagInput = ref<string>('')
let description = ref<string>('')
let release = ref<boolean>(false)
let releaseTime = ref<string>('')
const imageUrl = ref('')
let partition = ref<partitionResponseData[]>([])
let partitionAndSubPartition = ref<string>('')
let videos = ref<[]>([])
let extension = ref<string>('')

let disabledDate = (time: any) => {
  return time.getTime() < Date.now() - 8.64e7;
}
onMounted(() => {
  getPartition()
})
const getPartition = async () => {
  let result: any = await reqPartition()
  if (result.code == 200) {
    partition.value = result.data
  }
}
/**
 * 将分块文件上传至服务器
 * @param file 上传的分块文件
 * @param chunkNumber 当前是第几块
 * @param chunkTotal 文件分块的总数
 * @param fileName 文件名称
 */
const uploadFileToServer = async (file: any, chunkNumber: any, chunkTotal: any, extension: any) => {
  const form = new FormData();
  form.append("file", file);
  // form.append("chunkNumber", chunkNumber);
  form.append("chunkIndex", chunkNumber);
  form.append("chunkTotal", chunkTotal);
  if (chunkNumber != 0) {
    form.append("name", curFileName.value)
  }
  form.append("extension", extension)

  const result = await axios.post("/api/video/upload", form, {
    headers: {
      'token': userStore.token
    }
  })
  return result
}
/**
 * el-upload内置的change函数，文件上传或者上传成功时的回调，不过这里因为
 * :auto-upload="false"的缘故，上床成功的回调不会执行
 * @param uploadFile el-upload当前上传的文件对象
 * @param uploadFiles el-upload上传的文件列表
 */
const handleChange: UploadProps['onChange'] = async (uploadFile, uploadFiles) => {

  // v-model:file-list="fileList" 就是这里的uploadFiles。这两个文件列表是一样的，多以在删除的时候，从fileList清除某一项，uploadFiles这里也会清除的
  // 这个el-upload 已经实现了的

  tableData.value.push({ ...uploadFile })
  const index = tableData.value.findIndex(item => item.uid === uploadFile.uid)

  let fileName = uploadFile.name
  extension.value = []
  for (let i = fileName.length - 1; i >= 0; i--) {
    if (fileName[i] == '.') break
    extension.value.unshift(fileName[i])
  }
  extension.value = extension.value.join('')

  const fileSize = uploadFile.size || 0
  let chunkTotals = Math.ceil(fileSize / chunkSize);
  let percents = 0
  if (chunkTotals > 0) {
    for (let chunkNumber = 0, start = 0; chunkNumber < chunkTotals; chunkNumber++, start += chunkSize) {
      let end = Math.min(fileSize, start + chunkSize);
      const files = uploadFile.raw?.slice(start, end)
      const result = await uploadFileToServer(files, chunkNumber, chunkTotals, extension.value)
      percents = percents + (100 / chunkTotals)
      if (percents > 100) {
        percents = 100
      }
      uploadFile.percentage = percents
      tableData.value[index].percentage = percents
      percentage.value = percents

      if (result.data.code == 200) {
        if (result.data.data && result.data.data.filename) {
          curFileName.value = result.data.data.filename
        }
      }

      if (tableData.value[index].percentage == 100) {
        videos.value.push({ videoLink: result.data.data.path, videoTitle: curFileName.value })
        tableData.value[index].videoTitle = curFileName.value
        const videoUrl = result.data.data.path
        tableData.value[index].url = videoUrl
      }
    }

  }
}

/**
 * 自定义的表格删除的方法
 * @param file 表格某一行的数据
 */
const handleRemoveUploadFileList = async (file: UploadFile) => {
  const index = fileList.value.findIndex((item: UploadFile) => item.uid === file.uid)
  if (index !== -1) {
    fileList.value.splice(index, 1)
  }
  const index2 = tableData.value.findIndex((item2: UploadFile) => item2.uid === file.uid)
  extension.value = []
  for (let i = file.name.length - 1; i >= 0; i--) {
    if (file.name[i] == '.') break
    extension.value.unshift(file.name[i])
  }
  extension.value = extension.value.join('')
  let result = await reqDelVideo(tableData.value[index2].videoTitle, extension.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    videos.value = videos.value.filter((item: any) => {
      return item.videoLink != tableData.value[index2].url
    })
    tableData.value.splice(index2, 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }


}
/**
 * 预览视频
 * @param row 表格传入的行数据
 */
const handlePreviewUploadFileList = (row: UploadFile) => {
  dialogTableVisible.value = true
  videoPath.value = row.url || ''
}
/**
 * el-dialog的回调
 */
const handleClose = () => {

  // 下面这两中都可以，any方便。HTMLVideoElement这个也行，有提示。两种方法写都可以不会报错

  // let myVideo:any = document.getElementById('video-play') //对应video标签的ID

  let myVideo: HTMLVideoElement = document.getElementById('video-play') as HTMLVideoElement//对应video标签的ID

  myVideo.pause()

  dialogTableVisible.value = false
  videoPath.value = ''
}

const closeTag = (tag: string) => {
  tags.value = tags.value.filter((item: any) => {
    return item != tag
  })
}
const addTag = () => {
  tagInput.value = tagInput.value.slice(0,tagInput.value.length - 1)
  tagInput.value = tagInput.value.substring(0, 20)
  let flag = true
  if (tagInput.value.trim() == '') {
    ElMessage({
      type: 'error',
      message: '标签不能为空'
    })
    flag = false
  }
  tags.value.forEach((tag) => {
    if (tag == tagInput.value) {
      ElMessage({
        type: 'error',
        message: '标签不能重复'
      })
      flag = false
    }
  })
  if (flag) {
    tags.value.push(tagInput.value)
  }
  tagInput.value = ''
}
const handleCoverSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = response.data
}

const submit = async () => {
  const [partition, subPartition] = partitionAndSubPartition.value.split(':')
  let result: any = await reqVideoSubmit({ videos: videos.value, coverImageLink: imageUrl.value, title: title.value, partitions: partition, subPartition: subPartition, tags: tags.value, description: description.value, releaseTime: value1.value + ' ' + value2.value })
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '投稿成功'
    })
  } else {
    ElMessage({
      type: 'error',
      message: '投稿失败'
    })
  }
}
const toEdit = (row: any) => {
  row.isEdit = true
}
const toLook = (row: any) => {
  row.isEdit = false
}
</script>

<style scoped lang="scss">
.upload {
  width: 100%;
  margin: 10px auto;
  max-width: 1100px;

  .uploadvideo {
    margin-bottom: 10px;
  }

  .formcard {
    .title {
      font-weight: 600;
      padding: 10px 0;
    }

    .form {
      .inputtag {
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 2px 10px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .tag {
          margin-right: 5px;
        }

        textarea {
          height: 26px;
          width: 100%;
          border: 0;
        }
      }

      .release {
        .switch {
          span {
            margin: 0 10px;
            color: #888;

          }

        }
      }

    }
  }
}
</style>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>