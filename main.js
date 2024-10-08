class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if(this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        // this.form.innerHTML = this.settings.success;
        alert(this.settings.success);
        document.getElementById("btn-submit").innerHTML = "Enviar";
        document.getElementById("btn-submit").disabled = false;
        const formFields = document.querySelectorAll(".form-control");
        formFields.forEach(element => {
            element.value = "";
        });
    }

    displayError() {
        alert(this.settings.error);
        document.getElementById("btn-submit").innerHTML = "Enviar";
        document.getElementById("btn-submit").disabled = false;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try{
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch(error) {
            this.displayError();
            throw new Error(error);
        }
    }
    
    init() {
        if(this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "Mensagem enviada com sucesso!",
    error: "Não foi possível enviar sua mensagem.",
});

formSubmit.init();