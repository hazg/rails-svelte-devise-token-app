<!-- routify:options index=1 -->
<script>
  import { User } from "./store/user";
  import { Router } from "@roxi/routify";
  import { routes } from "../../.routify/routes";
  import './stylesheets/bootstrap.css'

</script>

<div>
<!-- {#if User.isLoggedIn() } -->
  <Router {routes} />
<!-- {:else} -->
  <!-- <Login /> -->
<!-- {/if} -->
</div>

<style>
  /* :global{ @import 'stylesheets/bootstrap'; } */
</style>