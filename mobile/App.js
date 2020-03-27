import React from 'react';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import Routes from './src/routes.js'

export default function App() {
  return (
    <Routes />
  );
}




/*const styles = StyleSheet.create({
  container: {
    flex: 1, //pro container ocupar tela toda
    backgroundColor: '#7159c1', //as propriedades mudam do css web: ao inves de hífen, retiro e coloco proxima letra caixa alta
    alignItems: "center", //propriedades que não são números, precism estar entre aspas '' ou ""
    justifyContent: 'center',
  },

  title: { //preciso de uma estilização própria por elemento
    color: '#023912',
    fontSize: 30,
    fontWeight: 'bold'
  },
});*/


//na web acostumamos a usar componentes <div> <span> <h1> <header> <footer>
//aqui posso utilizar <div> pra tudo, alem de Text (textos em geral, substitui h1, h2..), View (containers).
//O StyleSheet tem o método .create que permite criar estilos, like CSS
//lembrar que posso estilizar no proprio componente, mas preciso sempre passar, dentro de {} um objeto, resultando em { { objeto }}. Ex.: style{ { background-color: "#fff" }}