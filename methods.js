export function reValidateUser(userIsSignedIn) {
    const button = document.getElementById('submit-button')
    const buttonSignIn = document.getElementById('sign-in-button')
    const buttonLogIn = document.getElementById('log-in-button')
    const buttonLogOut = document.getElementById('log-out-button')

    console.log('estoy revalidando')

    if (userIsSignedIn) {
        button.removeAttribute('disabled')
        buttonLogIn.setAttribute('disabled', true)
        buttonSignIn.setAttribute('disabled', true)
        buttonLogOut.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', true)
        buttonLogIn.removeAttribute('disabled')
        buttonSignIn.removeAttribute('disabled')
        buttonLogOut.setAttribute('disabled', true)
    }

}