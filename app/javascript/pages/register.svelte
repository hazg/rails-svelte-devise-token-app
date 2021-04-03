<script>
import { User } from "../store/user";
// TODO: Change to original package, after commit pull request https://github.com/hazg/svelte-toast/pull/2
import { Form, Field, Select } from "sveltestrap-forms-lib";
import { SvelteToast, toast } from 'svelte-toast'
import { FormGroup, Input} from "sveltestrap";

let email, password, passwordConfirmation

let csrf = document.querySelector('meta[name=csrf-token]').content
let param = document.querySelector('meta[name=csrf-param]').content

async function formSubmit(data){
  let res = await User.register(email, password, passwordConfirmation)
  if(res.errors){
    toast.push(res.errors.join('<br />'))
  }else{
    User.signIn(res.token)
    toast.push('Вы зарегистрировались '+res.data['email'])
    window.location = '/'
  }
}

</script>

<form method='post' action="/api/v1/auth/register">
  <FormGroup>
    <Input placeholder="Почта" type="email" name="email" bind:value={email} />
    <Input placeholder="Пароль" type="password" name="password" autocomplete="on" bind:value={password} />
    <Input placeholder="Еще раз" type="password" name="password_confirmation" autocomplete="on" bind:value={passwordConfirmation} />

    <Input type="hidden" name="authenticity_token" bind:value={csrf} />
  </FormGroup>

  <button on:click|preventDefault={formSubmit} class="btn btn-secondary">
    Войти
  </button>
  <SvelteToast />
</form>