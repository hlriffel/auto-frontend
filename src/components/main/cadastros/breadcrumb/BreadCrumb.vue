<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <router-link tag="li" to="/main/cadastros/categoria">
        <a>
          <span class="icon is-small">
            <i class="fas fa-home" aria-hidden="true"></i>
          </span>
          <span>Categoria</span>
        </a>
      </router-link>
      <router-link tag="li" to="/main/cadastros/caracteristica">
        <a :class="{ 'is-active': $route.name === 'caracteristica' }">
          <span class="icon is-small">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          <span>Característica</span>
        </a>
      </router-link>
      <router-link tag="li" to="/main/cadastros/questionario">
        <a :class="{ 'is-active': $route.name === 'questionario' }">
          <span class="icon is-small">
            <i class="fas fa-puzzle-piece" aria-hidden="true"></i>
          </span>
          <span>Autoavaliação</span>
        </a>
      </router-link>
      <router-link tag="li" to="/main/cadastros/licao">
        <a :class="{ 'is-active': $route.name === 'licao' }">
          <span class="icon is-small">
            <i class="fas fa-puzzle-piece" aria-hidden="true"></i>
          </span>
          <span>Lição</span>
        </a>
      </router-link>
      <router-link tag="li" to="/main/cadastros/conteudo">
        <a :class="{ 'is-active': $route.name === 'conteudo' }">
          <span class="icon is-small">
            <i class="fas fa-puzzle-piece" aria-hidden="true"></i>
          </span>
          <span>Conteúdo</span>
        </a>
      </router-link>
    </ul>
  </nav>
</template>