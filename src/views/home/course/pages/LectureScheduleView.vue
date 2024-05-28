<template>
  <div class="chat-page">
    <div class="chat-box">
      <div class="message" v-for="(msg, index) in messages" :key="index" :class="{ 'user-message': msg.user, 'ai-message': !msg.user }">
        <div class="message-content-container" :class="{ 'user-message-container': msg.user }">
          <template v-if="msg.user">
            <p class="message-content">{{ msg.text }}</p>
            <el-avatar icon="el-icon-user" class="avatar user-avatar"></el-avatar>
          </template>
          <template v-else>
            <el-avatar icon="el-icon-s-custom" class="avatar ai-avatar"></el-avatar>
            <p class="message-content">{{ msg.text }}</p>
          </template>
        </div>
      </div>
    </div>
    <div class="input-box">
      <input type="text" v-model="userInput" @keyup.enter="sendMessage" placeholder="请输入问题..." />
      <button @click="sendMessage">发送信息</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      messages: [
        { text: '你好，我是你的排课小助手，请问有什么我能帮助你的吗？', user: false }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() !== '') {
        this.messages.push({ text: this.userInput, user: true });
        this.getAnswer(this.userInput);
        this.userInput = '';
      }
    },
    async getAnswer(question) {
      const apiKey = 'sk-M8hVJUlSIx4emM13A7A8Fe80184442BeA3Ce5e7eEa42Da01';
      const model = 'gpt-3.5-turbo-16k';

      const systemPrompt = '你是我的私人排课助手,这周五由于听力课和语音课时间安排冲突，语音课将被推迟到下周一，请知悉。';

      try {
        const response = await axios.post(
          'https://api.rcouyi.com/v1/chat/completions',
          {
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: question },
            ],
            temperature: 1
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const aiResponse = response.data.choices[0].message.content;
        this.messages.push({ text: aiResponse, user: false });
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  }
};
</script>


<style>
.chat-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chat-box {
  width: 100%;
  height: 85%;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  margin-bottom: 20px;
  background-color: #f9f9f9;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-message {
  justify-content: flex-end;
  text-align: right;
}

.ai-message {
  justify-content: flex-start;
  text-align: left;
}

.message-content-container {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 10px;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: #e0e0e0;
}

.input-box {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 7%;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 0 5px 5px 0;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
