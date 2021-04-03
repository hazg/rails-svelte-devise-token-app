<!-- routify:options index=1 -->
<script>
  import { User } from './store/user'
  import { Router } from '@roxi/routify'
  import { routes } from '../../.routify/routes'
  import { Navbar, NavItem, NavLink, Nav } from 'sveltestrap'
  import { _, addMessages, init } from 'svelte-i18n'
  import './stylesheets/bootstrap.css'

  import en from './locales/en.json'; addMessages('en', en);
  import ru from './locales/ru.json'; addMessages('ru', ru);

  init({
    fallbackLocale: 'en',
    initialLocale: 'ru',
  })


</script>

<Navbar>
  <Nav>
    {#if User.isLoggedIn() }
      <NavItem>
        <NavLink href='#' on:click={User.signOut}>{$_('exit')}</NavLink>
      </NavItem>
    {:else}
      <NavItem><NavLink href='/register'>{$_('register')}</NavLink></NavItem>
      <NavItem><NavLink href='/login'>{$_('login')}</NavLink></NavItem>
    {/if}
  </Nav>
</Navbar>
<Router {routes} />
