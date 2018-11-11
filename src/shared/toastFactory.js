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
}

const toastFactory = new ToastFactory();

export default toastFactory;
