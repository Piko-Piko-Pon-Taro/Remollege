<template>
  <v-card :color="$const.BASE_COLOR" class="mx-auto pa-5 elevation-0">
    <div id="videos-container">
      <v-row no-gutters>
        <v-col :width="videoWidth">
          <VideoCard
            v-if="localStream"
            :id="'self'"
            :videoWidth="videoWidth"
            :videoHeight="videoHeight"
            :name="user.name"
            :stream="localStream"
            :muted="true"
            class="pb-0 mb-3"
          />
          <!-- <UserBanner
            v-if="localStream"
            :img="user.img"
            :name="user.name"
            :width="videoWidth"
            class="mx-2"
          />-->
        </v-col>
        <v-col
          v-for="peerStream in peerStreams"
          :key="peerStream.peerId"
          :width="videoWidth"
        >
          <VideoCard
            :id="peerStream.peerId"
            :width="videoWidth"
            :height="videoHeight"
            :stream="peerStream"
            :muted="false"
            class="pb-0 mb-3"
          />
          <!-- <UserBanner
            v-if="localStream"
            :img="user.img"
            :name="user.name"
            :width="videoWidth"
            class="mx-2"
            style="display: block;"
          />-->
        </v-col>
      </v-row>
    </div>

    <v-bottom-navigation
      v-model="bottomNav"
      :color="$const.MAIN_COLOR"
      :background-color="$const.BASE_COLOR2"
      horizontal
    >
      <v-btn @click="$emit('leave')" value="hangup">
        <span>Leave</span>
        <v-icon>mdi-phone-hangup</v-icon>
      </v-btn>

      <v-btn @click="toggleCamera" value="video">
        <span>Video</span>
        <v-icon v-if="isCamOn">mdi-video</v-icon>
        <v-icon v-if="!isCamOn">mdi-video-off</v-icon>
      </v-btn>

      <v-btn @click="toggleMute" value="mic">
        <span>Mic</span>
        <v-icon v-if="!isMute">mdi-microphone</v-icon>
        <v-icon v-if="isMute">mdi-microphone-off</v-icon>
      </v-btn>

      <!-- 相手の音ミュート用 -->
      <!-- <v-btn>
        <span value="speaker">Speaker</span>
        <v-icon>mdi-volume-high</v-icon>
        <v-icon>mdi-volume-off</v-icon>
      </v-btn>-->

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" value="cog">
            <span>Settings</span>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Settings</span>
          </v-card-title>
          <v-card-subtitle v-if="!selectedAudio || !selectedVideo">
            <span>マイクとカメラを選択してください</span>
          </v-card-subtitle>
          <v-card-text class="my-0 pt-3 pb-0">
            <v-container class="my-0 py-0">
              <v-row class="my-0 py-0">
                <v-col cols="12" class="my-0 py-0">
                  <v-select
                    v-model="selectedAudio"
                    @change="onDeviceChange"
                    :items="audioDevices"
                    label="Select Audio"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12" class="my-0 py-0">
                  <v-select
                    v-model="selectedVideo"
                    @change="onDeviceChange"
                    :items="videoDevices"
                    label="Select Camera"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <ActionButton
              v-if="selectedAudio && selectedVideo"
              @click="dialog = false"
              text="OK"
              class="mx-auto my-0 py-0"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
let Peer
if (process.client) {
  Peer = require('skyway-js')
}
export default {
  components: {
    VideoCard: () => import('@/components/organisms/VideoCard'),
    ActionButton: () => import('@/components/atoms/ActionButton')
    // UserBanner: () => import('@/components/organisms/UserBanner')
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      bottomNav: 'cog',
      selectedAudio: '',
      selectedVideo: '',
      audioDevices: [],
      videoDevices: [],
      videoWidth: 300,
      videoHeight: 240,
      peerStreams: [],
      localStream: null,
      peerId: '',
      connectedRoomId: '',
      existingCall: null,
      isTalking: false,
      isMute: false,
      isCamOn: true
    }
  },
  created() {
    this.initPeer()
  },

  methods: {
    async initPeer() {
      const credential = await this.getCredential()
      this.peer = new Peer(this.user.id, {
        key: process.env.SKYWAY_API_KEY,
        credential,
        debug: 0
      })

      this.peer.on('open', () => {
        this.peerId = this.peer.id
      })

      this.peer.on('call', (call) => {
        call.answer(this.localStream)
        this.setupCallEventHandlers(call)
      })

      this.peer.on('error', (err) => {
        if (err.type === 'invalid-key')
          alert('ビデオ通話サーバーに接続できません')
      })
    },
    async getCredential() {
      try {
        const { data } = await this.$api.post('/video/authenticate', {
          peerId: this.user.id,
          sessionToken: '' // sessionTokenチェック未使用
        })
        return data
      } catch (err) {
        alert(err)
      }
    },

    getDefaultDevices(chatId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(
          () =>
            navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
              for (let i = 0; i !== deviceInfos.length; ++i) {
                const deviceInfo = deviceInfos[i]
                if (deviceInfo.kind === 'audioinput') {
                  this.audioDevices.push({
                    text:
                      deviceInfo.label ||
                      `Microphone ${this.audioDevices.length}`,
                    value: deviceInfo.deviceId
                  })
                } else if (deviceInfo.kind === 'videoinput') {
                  this.videoDevices.push({
                    text:
                      deviceInfo.label || `Camera  ${this.videoDevices.length}`,
                    value: deviceInfo.deviceId
                  })
                }
              }
              this.selectedAudio = this.audioDevices[0].value
              this.selectedVideo = this.videoDevices[0].value
              const constraints = {
                audio: this.selectedAudio
                  ? { deviceId: { exact: this.selectedAudio } }
                  : false,
                video: this.selectedVideo
                  ? { deviceId: { exact: this.selectedVideo } }
                  : false
              }
              if (constraints.video) {
                constraints.video.width = {
                  exact: this.videoWidth
                }
                constraints.video.height = {
                  exact: this.videoHeight
                }
              }
              navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                  this.localStream = stream
                  this.makeCall(chatId)
                })
            })
          // .catch((err) => alert(err))
        )
        .catch(() => console.log('デバイスに接続できません'))
    },

    onDeviceChange() {
      // ダイアログ閉じたときに後で変更
      if (this.selectedAudio !== '' && this.selectedVideo !== '') {
        // this.connectSelectedDevices()
        // return
      }
    },

    async connectSelectedDevices() {
      const constraints = {
        audio: this.selectedAudio
          ? { deviceId: { exact: this.selectedAudio } }
          : false,
        video: this.selectedVideo
          ? { deviceId: { exact: this.selectedVideo } }
          : false
      }
      if (constraints.video) {
        constraints.video.width = {
          exact: this.videoWidth
        }
        constraints.video.height = {
          exact: this.videoHeight
        }
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.localStream = stream
    },

    initChat(chatId) {
      this.getDefaultDevices(chatId)
    },
    makeCall(chatId) {
      const call = this.peer.joinRoom(chatId, {
        mode: 'sfu',
        stream: this.localStream
      })
      this.setupCallEventHandlers(call)
    },

    setupCallEventHandlers(call) {
      this.closeCall()

      this.existingCall = call
      this.setupEndCallUI()
      this.connectedRoomId = call.name

      call.on('stream', (stream) => {
        this.addVideo(stream)
      })

      call.on('peerLeave', (peerId) => {
        this.removeVideo(peerId)
      })

      call.on('close', () => {
        this.removeAllVideos()
        this.setupMakeCallUI()
      })
    },

    addVideo(stream) {
      this.peerStreams.push(stream)
    },

    removeVideo(peerId) {
      this.peerStreams.some((v, i) => {
        if (v.peerId === peerId) this.peerStreams.splice(i, 1)
      })
    },

    removeAllVideos() {
      this.peerStreams = []
    },

    setupMakeCallUI() {
      this.isTalking = false
    },

    setupEndCallUI() {
      this.isTalking = true
    },

    toggleMute() {
      if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0]
        audioTrack.enabled = !audioTrack.enabled
        this.isMute = !audioTrack.enabled
      }
    },
    toggleCamera() {
      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0]
        videoTrack.enabled = !videoTrack.enabled
        this.isCamOn = videoTrack.enabled
      }
    },
    closeCall() {
      if (this.existingCall) {
        this.existingCall.close()
        this.existingCall = null
      }
    }
  }
}
</script>
