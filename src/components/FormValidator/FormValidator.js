export function makeInputs(inputConfig, validation) {
    return {
        ...inputConfig,
        validation,
        valid : !validation,
        touched : false,
        value : ''
    }
}

export function validateInput(value, validation = null){
    if(!validation){
        return true
    }

    let isValid = true

    if(validation.required){
        isValid = value.trim() !== '' && isValid
    }

    if(validation.regular){
        isValid = !!value.match(validation.regular) && isValid
    }

    if(validation.minLength){
        isValid = value.length >= 6 && isValid
    }

    return isValid
}

export function validateForm(inputs) {
    let formValid = true

    for( let input in inputs){
        if(inputs.hasOwnProperty(input)){
          formValid = inputs[input].valid && formValid
        }
    }

    return formValid
}