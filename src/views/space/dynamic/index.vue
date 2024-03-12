<template>
  <el-row class="row">
    <el-col :span="18">
      <div class="left">
        <div class="dynamiclist">
          <div v-for="(item, index) of dynamicList" :key="item.markId" class="outer-item">
            <el-card v-if="item.quoteType == 0" :body-style="elCardBodyStyle" style="margin-bottom: 8px;">
              <div class="item">
                <div class="avatar">
                  <img :src="item.userImage" style="width: 50px;height: 50px;border-radius: 50%;">
                </div>
                <div class="header0">
                  <div class="header-container">
                    <div class="name">{{ item.userName }}</div>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <div class="threepoint" v-if="userStore.userId==item.userId">
                    <el-popconfirm title="你确定要删除吗" @confirm="deleteDynamic(item.markId)">
                      <template #reference>
                        <img src="../images/三个点点.png" style="width: 20px;height: 20px;">
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
                <div class="body">
                  <div class="title">{{ item.content }}</div>
                  <div class="content" style="background-color: transparent;" v-if="item.images.length > 0">
                    <div class="innercontent">
                      <div class="imagelist"
                        style="width: 435px;display: grid;grid-template-columns: repeat(3,1fr);gap: 5px;">
                        <div class="img"
                          style="width: 140px;height: 140px;border: 1px solid #eee;display: flex;align-items: center;">
                          <img v-for="(img, index) of item.images" :key="img" :src="img" style="width: 140px;">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <el-button style="width: 50px;" class="footbtn" :class="item.activeBtnIndex == 1 ? 'active' : ''"
                    @click="item.activeBtnIndex == 1 ? item.activeBtnIndex = 0 : item.activeBtnIndex = 1">
                    <img src="../images/转发.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    转发
                  </el-button>
                  <el-button class="footbtn" :class="item.activeBtnIndex == 2 ? 'active' : ''" @click="showMark(item)">
                    <img src="../images/评论.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.marks }}
                  </el-button>
                  <el-button class="footbtn" v-if="!item.isLike" @click="like(item.markId)">
                    <img src="../images/赞.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                  <el-button class="footbtn" v-if="item.isLike" @click="unLike(item.markId)">
                    <img src="../images/赞2.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                </div>
                <div class="foot">
                  <div class="activeBtnIndex1" v-if="item.activeBtnIndex == 1" style="display: flex;">
                    <div class="footavatar" style="margin-right: 10px;">
                      <img src="../images/头像.jpg" style="width: 30px;height: 30px;border-radius: 50%;">
                    </div>
                    <div class="footarea" style="width: 100%;">
                      <el-popover :visible="visible" placement="bottom" :width="240">

                        <template #reference>
                          <el-input @input="inputContent" class="textarea" v-model="content"
                            :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                        </template>
                        <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                        <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                        <el-scrollbar height="200px" @scroll="handleScroll">
                          <div class="atfollowlist">
                            <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                              v-for="(item, index) of atFollowList" style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                          <div class="searchnamelist">
                            <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                              v-for="(item, index) of searchNameList"
                              style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                        </el-scrollbar>
                      </el-popover>

                      <el-button @click="publish(item.markId)" color="#00aeec"
                        style="color: white;width: 80px;float: right;margin: 4px 0">转发</el-button>
                    </div>
                  </div>
                  <div class="activeBtnIndex2" v-if="item.activeBtnIndex == 2">
                    <div class="foot-header" style="display: flex;align-items: center;padding-bottom: 20px;">
                      <div class="title" style="margin-right: 30px;">
                        <span style="font-size: 17px; font-weight: 600;margin-right: 6px;">评论</span>
                        <span style="font-size: 13px;color: #888;">{{ item.marks }}</span>
                      </div>
                      <div class="sort" style="display: flex;font-size: 13px;">
                        <div style="padding-right: 10px;border-right: 1px solid #ccc;" :class="heat ? 'active' : ''"
                          @click="chooseHeat(true, item)">最热
                        </div>
                        <div style="padding-left: 10px;" :class="!heat ? 'active' : ''"
                          @click="chooseHeat(false, item)">
                          最新</div>
                      </div>
                    </div>
                    <div class="foot-form" style="display: flex;">
                      <div class="footavatar" style="margin-right: 10px;">
                        <img :src="item.userImage" style="width: 30px;height: 30px;border-radius: 50%;">
                      </div>
                      <div class="footarea" style="width: 100%;">
                        <el-popover :visible="visible" placement="bottom" :width="240">

                          <template #reference>
                            <el-input @input="inputContent" class="textarea" v-model="content"
                              :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                              placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                          </template>
                          <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                          <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                          <el-scrollbar height="200px" @scroll="handleScroll">
                            <div class="atfollowlist">
                              <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                                v-for="(item, index) of atFollowList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="searchnamelist">
                              <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                                v-for="(item, index) of searchNameList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                          </el-scrollbar>
                        </el-popover>

                        <el-button @click="publishMark(item)" color="#00aeec"
                          style="color: white;width: 80px;float: right;margin: 4px 0">发布</el-button>
                      </div>
                    </div>
                    <div class="marklist">
                      <div v-for="(mark, index) of marklist" :key="mark.markId" class="markitem" style="display: flex;">
                        <div class="mark-avatar">
                          <img :src="mark.userImage"
                            style="width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;">
                        </div>
                        <div class="mark-right">
                          <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">{{ mark.userName }}
                            Lv{{ mark.level
                            }}</div>
                          <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                            <span v-html="mark.content"></span>
                          </div>
                          <div class="mark-right-footer"
                            style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                            <div class="time" style="margin-right: 20px;">{{ item.time.split(' ')[0] }}</div>
                            <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                              <img @click="likeMark(mark.markId, item)" v-if="!mark.isLike" src="../images/赞.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              <img @click="unLikeMark(mark.markId, item)" v-if="mark.isLike" src="../images/赞2.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              {{ mark.likes }}
                            </div>
                            <div class="reply" style="cursor: pointer;">
                              回复
                            </div>
                          </div>
                          <div class="mark-reply">
                            <div v-for="(reply, index) of mark.replys" :key="reply.replyId" class="markitem"
                              style="display: flex;">
                              <div class="mark-avatar">
                                <img :src="reply.userImage"
                                  style="width: 30px;height: 30px;border-radius: 50%;margin-right: 10px;">
                              </div>
                              <div class="mark-right">
                                <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">
                                  {{ reply.userName }} Lv{{ reply.level }}
                                </div>
                                <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                                  {{ reply.content }}
                                </div>

                                <div class="mark-right-footer"
                                  style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                                  <div class="time" style="margin-right: 20px;">{{ reply.time.split(' ')[0] }}</div>
                                  <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                                    <img @click="likeReply(reply.replyId, item)" v-if="!reply.isLike"
                                      src="../images/赞.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    <img @click="unLikeReply(reply.replyId, item)" v-if="reply.isLike"
                                      src="../images/赞2.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    {{ reply.likes }}
                                  </div>
                                  <div class="reply" style="cursor: pointer;">
                                    回复
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card v-if="item.quoteType == 1" :body-style="elCardBodyStyle" style="margin-bottom: 8px;">
              <div class="item">
                <div class="avatar">
                  <img :src="item.userImage" style="width: 50px;height: 50px;border-radius: 50%;">
                </div>
                <div class="header0">
                  <div class="header-container">
                    <div class="name">{{ item.userName }}</div>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <div class="threepoint" v-if="userStore.userId==item.userId">
                    <el-popconfirm title="你确定要删除吗" @confirm="deleteDynamic(item.markId)">
                      <template #reference>
                        <img src="../images/三个点点.png" style="width: 20px;height: 20px;">
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
                <div class="body">
                  <div class="title">{{ item.content }}</div>
                  <div class="content">
                    <div class="author">
                      <div class="authoravatar">
                        <img :src="item.dongtaiOutline.userImage" style="width: 20px;height: 20px;border-radius: 50%;">
                      </div>
                      <div class="name">{{ item.dongtaiOutline.userName }}</div>
                    </div>
                    <div class="innercontent">
                      <div class="imagelist"
                        style="width: 435px;display: grid;grid-template-columns: repeat(3,1fr);gap: 5px;">
                        <div class="img"
                          style="width: 140px;height: 140px;border: 1px solid #eee;display: flex;align-items: center;">
                          <img v-for="(img, index) of item.dongtaiOutline.images" :key="img" :src="img"
                            style="width: 140px;">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <el-button style="width: 50px;" class="footbtn" :class="item.activeBtnIndex == 1 ? 'active' : ''"
                    @click="item.activeBtnIndex == 1 ? item.activeBtnIndex = 0 : item.activeBtnIndex = 1">
                    <img src="../images/转发.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    转发
                  </el-button>
                  <el-button class="footbtn" :class="item.activeBtnIndex == 2 ? 'active' : ''" @click="showMark(item)">
                    <img src="../images/评论.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.marks }}
                  </el-button>
                  <el-button class="footbtn" v-if="!item.isLike" @click="like(item.markId)">
                    <img src="../images/赞.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                  <el-button class="footbtn" v-if="item.isLike" @click="unLike(item.markId)">
                    <img src="../images/赞2.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                </div>
                <div class="foot">
                  <div class="activeBtnIndex1" v-if="item.activeBtnIndex == 1" style="display: flex;">
                    <div class="footavatar" style="margin-right: 10px;">
                      <img src="../images/头像.jpg" style="width: 30px;height: 30px;border-radius: 50%;">
                    </div>
                    <div class="footarea" style="width: 100%;">
                      <el-popover :visible="visible" placement="bottom" :width="240">

                        <template #reference>
                          <el-input @input="inputContent" class="textarea" v-model="content"
                            :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                        </template>
                        <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                        <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                        <el-scrollbar height="200px" @scroll="handleScroll">
                          <div class="atfollowlist">
                            <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                              v-for="(item, index) of atFollowList" style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                          <div class="searchnamelist">
                            <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                              v-for="(item, index) of searchNameList"
                              style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                        </el-scrollbar>
                      </el-popover>

                      <el-button @click="publish(item.markId)" color="#00aeec"
                        style="color: white;width: 80px;float: right;margin: 4px 0">转发</el-button>
                    </div>
                  </div>
                  <div class="activeBtnIndex2" v-if="item.activeBtnIndex == 2">
                    <div class="foot-header" style="display: flex;align-items: center;padding-bottom: 20px;">
                      <div class="title" style="margin-right: 30px;">
                        <span style="font-size: 17px; font-weight: 600;margin-right: 6px;">评论</span>
                        <span style="font-size: 13px;color: #888;">{{ item.marks }}</span>
                      </div>
                      <div class="sort" style="display: flex;font-size: 13px;">
                        <div style="padding-right: 10px;border-right: 1px solid #ccc;" :class="heat ? 'active' : ''"
                          @click="chooseHeat(true, item)">最热
                        </div>
                        <div style="padding-left: 10px;" :class="!heat ? 'active' : ''"
                          @click="chooseHeat(false, item)">
                          最新</div>
                      </div>
                    </div>
                    <div class="foot-form" style="display: flex;">
                      <div class="footavatar" style="margin-right: 10px;">
                        <img :src="item.userImage" style="width: 30px;height: 30px;border-radius: 50%;">
                      </div>
                      <div class="footarea" style="width: 100%;">
                        <el-popover :visible="visible" placement="bottom" :width="240">

                          <template #reference>
                            <el-input @input="inputContent" class="textarea" v-model="content"
                              :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                              placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                          </template>
                          <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                          <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                          <el-scrollbar height="200px" @scroll="handleScroll">
                            <div class="atfollowlist">
                              <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                                v-for="(item, index) of atFollowList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="searchnamelist">
                              <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                                v-for="(item, index) of searchNameList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                          </el-scrollbar>
                        </el-popover>

                        <el-button @click="publishMark(item)" color="#00aeec"
                          style="color: white;width: 80px;float: right;margin: 4px 0">发布</el-button>
                      </div>
                    </div>
                    <div class="marklist">
                      <div v-for="(mark, index) of marklist" :key="mark.markId" class="markitem" style="display: flex;">
                        <div class="mark-avatar">
                          <img :src="mark.userImage"
                            style="width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;">
                        </div>
                        <div class="mark-right">
                          <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">{{ mark.userName }}
                            Lv{{ mark.level
                            }}</div>
                          <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                            <span v-html="mark.content"></span>
                          </div>
                          <div class="mark-right-footer"
                            style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                            <div class="time" style="margin-right: 20px;">{{ item.time.split(' ')[0] }}</div>
                            <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                              <img @click="likeMark(mark.markId, item)" v-if="!mark.isLike" src="../images/赞.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              <img @click="unLikeMark(mark.markId, item)" v-if="mark.isLike" src="../images/赞2.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              {{ mark.likes }}
                            </div>
                            <div class="reply" style="cursor: pointer;">
                              回复
                            </div>
                          </div>
                          <div class="mark-reply">
                            <div v-for="(reply, index) of mark.replys" :key="reply.replyId" class="markitem"
                              style="display: flex;">
                              <div class="mark-avatar">
                                <img :src="reply.userImage"
                                  style="width: 30px;height: 30px;border-radius: 50%;margin-right: 10px;">
                              </div>
                              <div class="mark-right">
                                <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">
                                  {{ reply.userName }} Lv{{ reply.level }}
                                </div>
                                <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                                  {{ reply.content }}
                                </div>

                                <div class="mark-right-footer"
                                  style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                                  <div class="time" style="margin-right: 20px;">{{ reply.time.split(' ')[0] }}</div>
                                  <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                                    <img @click="likeReply(reply.replyId, item)" v-if="!reply.isLike"
                                      src="../images/赞.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    <img @click="unLikeReply(reply.replyId, item)" v-if="reply.isLike"
                                      src="../images/赞2.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    {{ reply.likes }}
                                  </div>
                                  <div class="reply" style="cursor: pointer;">
                                    回复
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card v-if="item.quoteType == 2" :body-style="elCardBodyStyle" style="margin-bottom: 8px;">
              <div class="item">
                <div class="avatar">
                  <img :src="item.userImage" style="width: 50px;height: 50px;border-radius: 50%;">
                </div>
                <div class="header0">
                  <div class="header-container">
                    <div class="name">{{ item.userName }}</div>
                    <div class="time">{{ item.time }}</div>
                  </div>
                  <div class="threepoint" v-if="userStore.userId==item.userId">
                    <el-popconfirm title="你确定要删除吗" @confirm="deleteDynamic(item.markId)">
                      <template #reference>
                        <img src="../images/三个点点.png" style="width: 20px;height: 20px;">
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
                <div class="body">
                  <div class="title">{{ item.content }}</div>
                  <div class="content content1">
                    <div class="video">
                      <img :src="item.videoOutline.coverImageLink" style="width: 100%;height: 100%;">
                      <span class="videolength">{{ item.videoOutline.videoLength }}</span>
                    </div>
                    <div class="right">
                      <div class="title">{{ item.videoOutline.title }}</div>
                      <div class="right-content">{{ item.videoOutline.description }}</div>
                      <div class="bottom">
                        <div class="bottomleft">
                          <img src="../images/视频 (2).png" style="width: 18px;height: 16px;margin-right: 4px;">
                          <span>{{ item.videoOutline.plays }}</span>
                        </div>
                        <div class="bottomright">
                          <img src="../images/弹幕 (2).png" style="width: 16px;height: 14px;margin-right: 4px;">
                          <span>{{ item.videoOutline.marks }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <el-button style="width: 50px;" class="footbtn" :class="item.activeBtnIndex == 1 ? 'active' : ''"
                    @click="item.activeBtnIndex == 1 ? item.activeBtnIndex = 0 : item.activeBtnIndex = 1">
                    <img src="../images/转发.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    转发
                  </el-button>
                  <el-button class="footbtn" :class="item.activeBtnIndex == 2 ? 'active' : ''" @click="showMark(item)">
                    <img src="../images/评论.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.marks }}
                  </el-button>
                  <el-button class="footbtn" v-if="!item.isLike" @click="like(item.markId)">
                    <img src="../images/赞.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                  <el-button class="footbtn" v-if="item.isLike" @click="unLike(item.markId)">
                    <img src="../images/赞2.png" style="width: 14px;height: 14px;margin-right: 4px;">
                    {{ item.likes }}
                  </el-button>
                </div>
                <div class="foot">
                  <div class="activeBtnIndex1" v-if="item.activeBtnIndex == 1" style="display: flex;">
                    <div class="footavatar" style="margin-right: 10px;">
                      <img src="../images/头像.jpg" style="width: 30px;height: 30px;border-radius: 50%;">
                    </div>
                    <div class="footarea" style="width: 100%;">
                      <el-popover :visible="visible" placement="bottom" :width="240">

                        <template #reference>
                          <el-input @input="inputContent" class="textarea" v-model="content"
                            :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                            placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                        </template>
                        <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                        <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                        <el-scrollbar height="200px" @scroll="handleScroll">
                          <div class="atfollowlist">
                            <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                              v-for="(item, index) of atFollowList" style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                          <div class="searchnamelist">
                            <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                              v-for="(item, index) of searchNameList"
                              style="display: flex;cursor: pointer;height: 50px;">
                              <div class="avatar">
                                <img :src="item.userImage"
                                  style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                              </div>
                              <div class="info"
                                style="display: flex;flex-direction: column;justify-content: space-around;">
                                <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                              </div>
                            </div>
                          </div>
                        </el-scrollbar>
                      </el-popover>

                      <el-button @click="publish(item.markId)" color="#00aeec"
                        style="color: white;width: 80px;float: right;margin: 4px 0">转发</el-button>
                    </div>
                  </div>
                  <div class="activeBtnIndex2" v-if="item.activeBtnIndex == 2">
                    <div class="foot-header" style="display: flex;align-items: center;padding-bottom: 20px;">
                      <div class="title" style="margin-right: 30px;">
                        <span style="font-size: 17px; font-weight: 600;margin-right: 6px;">评论</span>
                        <span style="font-size: 13px;color: #888;">{{ item.marks }}</span>
                      </div>
                      <div class="sort" style="display: flex;font-size: 13px;">
                        <div style="padding-right: 10px;border-right: 1px solid #ccc;" :class="heat ? 'active' : ''"
                          @click="chooseHeat(true, item)">最热
                        </div>
                        <div style="padding-left: 10px;" :class="!heat ? 'active' : ''"
                          @click="chooseHeat(false, item)">
                          最新</div>
                      </div>
                    </div>
                    <div class="foot-form" style="display: flex;">
                      <div class="footavatar" style="margin-right: 10px;">
                        <img :src="item.userImage" style="width: 30px;height: 30px;border-radius: 50%;">
                      </div>
                      <div class="footarea" style="width: 100%;">
                        <el-popover :visible="visible" placement="bottom" :width="240">

                          <template #reference>
                            <el-input @input="inputContent" class="textarea" v-model="content"
                              :autosize="{ minRows: 3, maxRows: 8 }" type="textarea"
                              placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" style="font-size: 15px;width: 100%;" />
                          </template>
                          <div class="header" style="font-size: 12px;margin-bottom: 4px;">选择或输入你想要@的人</div>
                          <div v-if="!isSearch" class="title" style="font-size: 13px;margin-bottom: 4px;">我的关注</div>
                          <el-scrollbar height="200px" @scroll="handleScroll">
                            <div class="atfollowlist">
                              <div @click="handleClickAt(item.userName as string)" v-if="!isSearch" class="item"
                                v-for="(item, index) of atFollowList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="searchnamelist">
                              <div @click="handleClickAt(item.userName as string)" v-if="isSearch" class="item"
                                v-for="(item, index) of searchNameList"
                                style="display: flex;cursor: pointer;height: 50px;">
                                <div class="avatar">
                                  <img :src="item.userImage"
                                    style="width: 40px;height: 40px;border-radius: 50%;margin-right: 4px;">
                                </div>
                                <div class="info"
                                  style="display: flex;flex-direction: column;justify-content: space-around;">
                                  <div class="name" style="font-size: 13px;color: black;">{{ item.userName }}</div>
                                  <div class="fans" style="font-size: 12px;">粉丝{{ item.fans }}</div>
                                </div>
                              </div>
                            </div>
                          </el-scrollbar>
                        </el-popover>

                        <el-button @click="publishMark(item)" color="#00aeec"
                          style="color: white;width: 80px;float: right;margin: 4px 0">发布</el-button>
                      </div>
                    </div>
                    <div class="marklist">
                      <div v-for="(mark, index) of marklist" :key="mark.markId" class="markitem" style="display: flex;">
                        <div class="mark-avatar">
                          <img :src="mark.userImage"
                            style="width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;">
                        </div>
                        <div class="mark-right">
                          <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">{{ mark.userName }}
                            Lv{{ mark.level
                            }}</div>
                          <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                            <span v-html="mark.content"></span>
                          </div>
                          <div class="mark-right-footer"
                            style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                            <div class="time" style="margin-right: 20px;">{{ item.time.split(' ')[0] }}</div>
                            <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                              <img @click="likeMark(mark.markId, item)" v-if="!mark.isLike" src="../images/赞.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              <img @click="unLikeMark(mark.markId, item)" v-if="mark.isLike" src="../images/赞2.png"
                                style="width: 13px;height: 13px;margin-right: 4px;">
                              {{ mark.likes }}
                            </div>
                            <div class="reply" style="cursor: pointer;">
                              回复
                            </div>
                          </div>
                          <div class="mark-reply">
                            <div v-for="(reply, index) of mark.replys" :key="reply.replyId" class="markitem"
                              style="display: flex;">
                              <div class="mark-avatar">
                                <img :src="reply.userImage"
                                  style="width: 30px;height: 30px;border-radius: 50%;margin-right: 10px;">
                              </div>
                              <div class="mark-right">
                                <div class="name" style="font-size: 13px;height: 30px;line-height: 30px;">
                                  {{ reply.userName }} Lv{{ reply.level }}
                                </div>
                                <div class="mark-content" style="font-size: 15px;margin-bottom: 4px;">
                                  {{ reply.content }}
                                </div>

                                <div class="mark-right-footer"
                                  style="display: flex;align-items: center;color: #888;font-size: 12px;margin-bottom: 10px;">
                                  <div class="time" style="margin-right: 20px;">{{ reply.time.split(' ')[0] }}</div>
                                  <div class="mark-reply-like" style="margin-right: 20px;cursor: pointer;">
                                    <img @click="likeReply(reply.replyId, item)" v-if="!reply.isLike"
                                      src="../images/赞.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    <img @click="unLikeReply(reply.replyId, item)" v-if="reply.isLike"
                                      src="../images/赞2.png" style="width: 13px;height: 13px;margin-right: 4px;">
                                    {{ reply.likes }}
                                  </div>
                                  <div class="reply" style="cursor: pointer;">
                                    回复
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="end" v-if="isEnd">
          您已经到达世界的尽头
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="right">
        <el-card class="userinfo">
          <div class="top">
            <div class="title">个人资料</div>
            <el-button @click="goSetting" size="small" style="background-color: transparent;">修改资料</el-button>
          </div>
          <div class="info">
            <div class="item">UID {{ userStore.userId }}</div>
            <div class="item">生日 {{ userStore.birthday }}</div>
            <div class="item">学校 {{ userStore.school }}</div>
          </div>
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user';
import useStyleStore from '@/store/modules/style';
import { reqPublishMark, reqLikeMark, reqUnLikeMark, reqLikeReply, reqUnLikeReply, reqMarks, reqPublishDynamic, reqSearchName, reqDeleteDynamic, reqDynamic, reqLikeDynamic, reqUnLikeDynamic, reqFollowList } from '@/api/dynamic';
import { markData, type dynamicData, type dynamicResponseData, type followData, type followResponseData, type markResponseData } from '@/api/dynamic/type';
import { ElMessage } from 'element-plus';
let userStore = useUserStore()
let styleStore = useStyleStore()
let $router = useRouter()
const goSetting = () => {
  $router.push('/account/setting')
}
let elCardBodyStyle = reactive({
  'padding': 0,
})
let pageNum = ref<number>(1)
let pageSize = ref<number>(5)
let dynamicList = ref<dynamicData[]>([])
let isEnd = ref<boolean>(false)
let visible = ref<boolean>(false)
let pageNum2 = ref<number>(1)
let pageSize2 = ref<number>(10)
let atFollowList = ref<followData[]>([])
let searchNameList = ref<followData[]>([])
let atFollowListIsEnd = ref<boolean>(false)
let searchNameListIsEnd = ref<boolean>(false)
let isSearch = ref<boolean>(false)
let searchName = ref<string>('')
let content = ref<string>('')
let heat = ref<boolean>(true)
let pageNum3 = ref<number>(1)
let pageSize3 = ref<number>(10)
let marklist = ref<markData[]>([])
onMounted(() => {
  getDynamic()
})
const getDynamic = async () => {
  let result: dynamicResponseData = await reqDynamic(pageNum.value, pageSize.value, userStore.userId)
  if (result.code == 200) {
    isEnd.value = result.isEnd
    dynamicList.value = [...dynamicList.value, ...result.data.record]
    dynamicList.value.forEach(item => {
      if (item.videoOutline) {
        item.videoOutline.videoLength = (item.videoOutline.totalHours == 0 ? '' : item.videoOutline.totalHours + ':') + (item.videoOutline.totalMinutes >= 10 ? item.videoOutline.totalMinutes : '0' + item.videoOutline.totalMinutes) + ':' + (item.videoOutline.totalSeconds >= 10 ? item.videoOutline.totalSeconds : '0' + item.videoOutline.totalSeconds)
      }
    });
    return 'ok'
  } else {
    return Promise.reject(new Error(result.message))
  }
}
watch(() => styleStore.isBottom, async (newValue: boolean) => {
  if (newValue) {
    pageNum.value++
    try {
      await getDynamic()
    } catch (error) {
      pageNum.value--
    }
  }
})
const deleteDynamic = async (dongtaiId: string) => {
  let result: any = await reqDeleteDynamic(dongtaiId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    dynamicList.value = []
    pageNum.value = 1
    getDynamic()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
const like = async (dongtaiId: string) => {
  try {
    await reqLikeDynamic(dongtaiId)
    dynamicList.value = []
    pageNum.value = 1
    getDynamic()
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unLike = async (dongtaiId: string) => {
  try {
    await reqUnLikeDynamic(dongtaiId)
    dynamicList.value = []
    pageNum.value = 1
    getDynamic()
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const inputContent = (e: any) => {
  let n = e.length
  if (n == 0) {
    visible.value = false
    return
  }
  if (e[n - 1] == '@') {
    visible.value = true
    isSearch.value = false
    return
  }
  let str: any = []
  if (e[n - 1] != ' ') {
    for (let i = n - 1; i >= 0; i--) {
      if (i == 0 && e[i] != '@') {
        visible.value = false
        return
      }
      if (e[i] == '@') {
        visible.value = true
        isSearch.value = true
        break
      }
      if (e[i] == ' ') {
        visible.value = false
        return
      }
      str.unshift(e[i])
    }
    searchName.value = str.join('')
    atFollowList.value = []
    searchNameList.value = []
    getSearchName()
  } else {
    visible.value = false
  }
}
watch(() => visible.value, (newValue: boolean) => {
  if (newValue) {
    pageNum2.value = 1
    atFollowList.value = []
    searchNameList.value = []
    getAtFollowList()
    getSearchName()
  }
})
watch(() => isSearch.value, (newValue: boolean) => {
  if (newValue) {
    pageNum2.value = 1
    atFollowList.value = []
    searchNameList.value = []
    getSearchName()
  } else {
    pageNum2.value = 1
    atFollowList.value = []
    searchNameList.value = []
    getAtFollowList()
  }
})
const getAtFollowList = async () => {
  let result: followResponseData = await reqFollowList(pageNum2.value, pageSize2.value, userStore.userId)
  if (result.code == 200) {
    atFollowListIsEnd.value = result.isEnd
    atFollowList.value = [...atFollowList.value, ...result.data.record]
  }
}
const handleScroll = (s: any) => {
  if (!isSearch) {
    if (s.scrollTop == atFollowList.value.length * 50 - 200) {
      if (!atFollowListIsEnd) {
        pageNum2.value++
        getAtFollowList()
      }
    }
  } else {
    if (s.scrollTop == searchNameList.value.length * 50 - 200) {
      if (!searchNameListIsEnd) {
        pageNum2.value++
        getSearchName()
      }
    }
  }
}
const getSearchName = async () => {
  let result: followResponseData = await reqSearchName(searchName.value, pageNum2.value, pageSize2.value)
  if (result.code == 200) {
    searchNameListIsEnd.value = result.isEnd
    if (result.data) {
      searchNameList.value = [...searchNameList.value, ...result.data.record]
    }
  }
}
const publish = async (quoteId: string) => {
  let result: any = await reqPublishDynamic({ content: content.value, quoteId, quoteType: 1 })
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '转发成功'
    })
    dynamicList.value = []
    pageNum.value = 1
    getDynamic()
  } else {
    ElMessage({
      type: 'error',
      message: '转发失败'
    })
  }
}
const handleClickAt = (userName: string) => {
  let n = content.value.length
  for (let i = n - 1; i >= 0; i--) {
    if (content.value[i] == '@') {
      break
    }
    content.value = content.value.slice(0, i)
  }
  const temp = [...content.value, ...userName, ' ']
  content.value = temp.join('')
  visible.value = false
}
const showMark = (item: any) => {
  if (item.activeBtnIndex != 2) {
    dynamicList.value.forEach((item) => {
      item.activeBtnIndex = 0
    })
  }
  item.activeBtnIndex == 2 ? item.activeBtnIndex = 0 : item.activeBtnIndex = 2
  if (item.activeBtnIndex == 2) {
    marklist.value = []
    pageNum3.value = 1
    getMark(item.markId)
  }
}
const getMark = async (markId: string) => {
  let result: markResponseData = await reqMarks({ parentId: markId, pageNum: pageNum3.value, pageSize: pageSize3.value, heat: heat.value })
  if (result.code == 200) {
    marklist.value = result.data.record
  }
}
const likeMark = async (markId: string, dynamic: any) => {
  try {
    await reqLikeMark(markId)
    marklist.value = []
    pageNum3.value = 1
    getMark(dynamic.markId)
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unLikeMark = async (markId: string, dynamic: any) => {
  try {
    await reqUnLikeMark(markId)
    marklist.value = []
    pageNum3.value = 1
    getMark(dynamic.markId)
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const likeReply = async (replyId: string, dynamic: any) => {
  try {
    await reqLikeReply(replyId)
    marklist.value = []
    pageNum3.value = 1
    getMark(dynamic.markId)
    ElMessage({
      type: 'success',
      message: '点赞成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '点赞失败'
    })
  }
}
const unLikeReply = async (replyId: string, dynamic: any) => {
  try {
    await reqUnLikeReply(replyId)
    marklist.value = []
    pageNum3.value = 1
    getMark(dynamic.markId)
    ElMessage({
      type: 'success',
      message: '取消成功'
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '取消失败'
    })
  }
}
const chooseHeat = (flag: boolean, dynamic: any) => {
  heat.value = flag
  marklist.value = []
  pageNum3.value = 1
  getMark(dynamic.markId)
}
const publishMark = async (item: dynamicData) => {
  let result: any = await reqPublishMark({ parentId: item.markId, authorId: item.userId, fromType: 1, content: content.value })
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '发表评论成功'
    })
    marklist.value = []
    pageNum3.value = 1
    getMark(item.markId)
  } else {
    ElMessage({
      type: 'error',
      message: '发表评论失败'
    })
  }
}
</script>

<style scoped lang="scss">
.row {
  width: 100%;

  .left {
    margin-right: 10px;

    .dynamiclist {
      .item {
        position: relative;
        padding-left: 80px;
        padding-right: 20px;

        .avatar {
          position: absolute;
          left: 0;
          top: 0;
          height: 86px;
          width: 86px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .header {
          padding: 16px 0 0 0;
          height: 56px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .name {
            font-size: 17px;
          }

          .time {
            font-size: 13px;
            color: #888;
          }
        }

        .header0 {
          padding: 16px 0 0 0;
          height: 56px;
          display: flex;
          justify-content: space-between;

          .header-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
              font-size: 17px;
            }

            .time {
              font-size: 13px;
              color: #888;
            }
          }

          .threepoint {
            img {
              cursor: pointer;
            }
          }
        }

        .body {
          margin-top: 8px;
          cursor: pointer;

          .title {
            font-size: 15px;
          }

          .content {
            margin-top: 12px;
            padding-top: 12px;
            padding-bottom: 14px;
            margin-left: -80px;
            margin-right: -20px;
            background-color: rgb(245, 245, 245);
            padding-left: 80px;
            padding-right: 20px;

            .author {
              display: flex;
              align-items: center;
              margin-bottom: 8px;

              .authoravatar {
                margin-right: 2px;
              }

              .name {
                color: #888;
                font-size: 15px;
              }
            }

            .innercontent {
              font-size: 15px;
              line-height: 25px;

              .imagelist {
                cursor: auto;
                margin-top: 12px;
              }
            }
          }

          .content1 {
            cursor: pointer;
            background-color: transparent;
            height: 132px;
            padding-top: 0;
            padding-bottom: 0;
            border: 1px solid #eee;
            border-radius: 5px;
            margin-left: 0px;
            margin-right: 0;
            padding-left: 0;
            display: flex;

            .video {
              width: 232px;
              height: 100%;
              position: relative;

              .videolength {
                position: absolute;
                bottom: 5px;
                right: 5px;
                color: white;
              }
            }

            .right {
              display: flex;
              flex-direction: column;
              padding: 12px;
              position: relative;

              .title {
                font-size: 15px;

                &:hover {
                  color: #00AEEC;
                  transition: all 0.2s linear;
                }
              }

              .right-content {
                margin-top: 6px;
                font-size: 13px;
                color: #666;
              }

              .bottom {
                position: absolute;
                bottom: 10px;
                display: flex;
                align-items: center;
                color: #888;
                font-size: 13px;

                .bottomleft {
                  width: 80px;
                  margin-right: 8px;
                  display: flex;
                  align-items: center;
                }

                .bottomright {
                  width: 80px;
                  margin-right: 8px;
                  display: flex;
                  align-items: center;
                }
              }
            }

          }
        }

        .footer {
          display: flex;
          justify-content: space-between;
          height: 50px;
          align-items: center;

          .footbtn {
            width: 104px;
            border: 0;
            padding: 0;
            background-color: transparent;
          }

          .active {
            color: #00AEEC;
          }
        }

        .foot {
          .activeBtnIndex2 {
            .foot-header {
              .sort {
                cursor: pointer;
                color: #888;

                .active {
                  color: black;
                }
              }

            }
          }
        }
      }
    }

    .end {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      font-size: 13px;
      color: #888;
    }
  }

  .right {
    .userinfo {
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }

      .info {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;

        .item {
          font-size: 12px;
          color: #888;
          width: 150px;
          margin: 10px 0;
        }
      }
    }
  }

}
</style>