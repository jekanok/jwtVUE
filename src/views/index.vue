<template>
  <v-app>
    <v-form v-model="valid">
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-text-field
              v-model="email"
              :counter="30"
              :rules="[rules.required, rules.email]"
              label="Ваша електронний адрес"
              required
            ></v-text-field>
          </v-flex>

          <v-flex xs12>
            <v-text-field
              v-model="password"
              :rules="[rules.required]"
              :counter="15"
              type="password"
              label="Ваш пароль"
              required
            ></v-text-field>
          </v-flex>
          <v-btn color="info" @click="auth" :disabled="!valid">Війти</v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: true,
      rules: {
        required: value => !!value || "Будь ласка заповніть поля.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Невірно введено електрону адрес";
        }
      }
    };
  },
  methods: {
    auth() {
      const data = {
        email: this.email,
        password: this.password
      };
      axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: data
      }).then(respons => {
        this.$router.push("/profile");
        localStorage.setItem("access_token", `${respons.data.access_token}`);
      });
    }
  }
};
</script>
<style>
</style>