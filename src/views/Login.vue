<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: (this.$v.email.$dirty && !this.$v.email.required) || (this.$v.email.$dirty && !this.$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
            class="helper-text invalid"
            v-if="this.$v.email.$dirty && !this.$v.email.required"
        >
          Поле e-mail не должно быть пустым
        </small>
        <small
            class="helper-text invalid"
            v-else-if="this.$v.email.$dirty && !this.$v.email.email"
        >
          Введите корректный e-mail
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (this.$v.password.$dirty && !this.$v.password.required) || (this.$v.password.$dirty && !this.$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="this.$v.password.$dirty && !this.$v.password.required"
        >
          Введите пароль
        </small>
        <small
            class="helper-text invalid"
            v-else-if="this.$v.password.$dirty && !this.$v.password.minLength"
        >
          Пароль не должен быть менее {{this.$v.password.$params.minLength.min}} символов. Сейчас он {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators';
  import messages from "@/utils/messages";

  export default {
    name: "Login",
    data: () => ({
      email: '',
      password: ''
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        const formData = {
          email: this.email,
          password: this.password
        };

        try {
          await this.$store.dispatch('login', formData);
          await this.$router.push('/')

          // eslint-disable-next-line no-empty
        } catch (e) {}

      }
    },
    mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
    }
  }
</script>



<style scoped>

</style>
