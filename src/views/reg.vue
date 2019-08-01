<template>
  <v-app>
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-layout>
            <v-flex xs12>
              <v-text-field label="Електроний адрес" v-model="email" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Придумайте пароль"
                type="password"
                v-model="password"
                :rules="[rules.required, rules.password]"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Повторіть пароль"
                type="password"
                v-model="repeatPassword"
                :rules="[rules.required, rules.password]"
              ></v-text-field>
            </v-flex>
            <v-btn color="info" @click="register" :disabled="!valid">Зареєструватися</v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-container>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      email: null,
      password: null,
      repeatPassword: null,
      rules: {
        required: value => !!value || "Будь ласка заповніть поля.",
        password: (value, val) =>
          this.password == this.repeatPassword || "Пароль не збігається.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Невірно введено електрону адрес";
        }
      }
    };
  },
  methods: {
    register() {
      const data = {
        email: this.email,
        password: this.password
      };
      axios({
        url: "http://localhost:3000/register",
        method: "post",
        data: data
      }).then(respons => {
        console.log(respons);
      });
    }
  }
};
</script>
<style scoped>
</style>
