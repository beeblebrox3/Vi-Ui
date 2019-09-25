let inputPosition = 0;

/**
 * @mixin
 */
export default {
  props: {
    /**
     * Valor do campo
     * @model
     */
    value: {
      type: [String, Number],
      default: null,
    },
    /**
     * Label do campo
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * Label extra ex: "(obrigatório)"
     */
    instruction: {
      type: String,
      default: null,
    },
    /**
     * Identificador do campo. Caso não definido, será um valor gerado automaticamente.
     */
    id: {
      type: String,
      default: () => {
        inputPosition += 1;
        return `ViInput__Field${inputPosition}`;
      },
    },
    /**
     * Nome do campo (usa o mesmo que `id` se não definido)
     */
    name: {
      type: String,
      default: null,
    },
    /**
     * Define se o elemento recebe o foco ao entrar a página
     */
    autoFocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Campo apenas leitura
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Campo desabilitado
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * _Validação:_ Define preechímento do campo como obrigatório
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * _Validação:_ Mensagens de erro personalizada. [Opções de validação](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-validity).
     * Quando null usa a mensagem padrão na língua definida do browser
     */
    customErrorMsg: {
      type: Object,
      default: null,
    },
    /**
     * _Validação:_ Validação em tempo real durante interação com o campo
     * Padão
     */
    forceValidation: {
      type: Boolean,
      default: false,
    },
    /**
     * Múltiplas seleções no mesmo campo
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeMessage(target) {
      const hasMessage = Object.keys(this.customErrorMsg).some(key => {
        if (target.validity[key]) {
          this.errorMsg = this.customErrorMsg[key];
        }
        return target.validity[key];
      });

      if (hasMessage) {
        target.setCustomValidity(this.errorMsg);
      } else if (this.errorMsg) {
        this.errorMsg = '';
        target.setCustomValidity('');
      }
    },
    validate(target) {
      this.validated = true;
      this.invalid = !target.validity.valid;

      /**
       * Evento de validação
       *
       * @event invalid
       * @type {boolean}
       */
      this.$emit('invalid', this.invalid);
    },
  },
  data() {
    return {
      validated: false,
      invalid: false,
      errorMsg: '',
    };
  },
};
