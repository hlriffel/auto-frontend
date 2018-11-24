import Vue from 'vue';

class ToastFactory {

  standardProperties = {
    theme: 'primary',
    position: 'top-center',
    duration: 5000    
  };

  showPrimaryToast(message) {
    Vue.toasted.show(message, {
      ...this.standardProperties,
      action: {
        text: 'FECHAR',
        onClick: (e, toast) => {
          toast.goAway(0);
        }
      }
    });
  }

  showConfirmToast(message, positiveCallback, negativeCallback) {
    Vue.toasted.show(message, {
      ...this.standardProperties,
      action: [
        {
          text: 'CONFIRMAR',
          onClick: positiveCallback
        },
        {
          text: 'CANCELAR',
          onClick: negativeCallback
        }
      ]
    });
  }

  /**
   * 
   * @param {String} message Mensagem a ser apresentada ao usuário
   * @param {Array} actions Array das ações que o usuário poderá selecionar.
   * Cada ação deve possuir o seguinte formato:
   * 
   * {
   *   text: 'EXEMPLO',
   *   onClick: funcaoASerExecutada
   * }
   */
  showToastWithCustomActions(message, actions) {
    Vue.toasted.show(message, {
      ...this.standardProperties,
      action: actions
    });
  }
}

const toastFactory = new ToastFactory();

export default toastFactory;
