const login = document.getElementById("login");
const signup = document.getElementById("signup");


const showText = {
    login: {
        header: "Not yet a member?",
        byline: "Sign up and discover what we can do for you",
        buttonText: "Sign up"
    },

    signup: {
        header: "Already a member?",
        byline: "Sign in and see what's new since your last visit",
        buttonText: "Sign in"
    }
};
const switchButton = document.getElementById("switch-button");
const switchText = document.getElementById("switch-text");

switchButton.addEventListener("click", () => {
    login.classList.toggle("hide-view");
    signup.classList.toggle("hide-view");
    login.classList.contains("hide-view")
        ? changeSwitchText("signup")
        : changeSwitchText("login");
});

function changeSwitchText(el) {
    switchText.children[0].innerText = showText[el].header;
    switchText.children[1].innerText = showText[el].byline;
    switchButton.innerText = showText[el].buttonText;
}

function showLoginForm() {
    document.getElementById("container").innerHTML =
        `    <div class="main-page">

        <div class="smooth login" id="login">
            <h1 class="login__header header">Welcome back to the party club</h1>
            <p class="login__byline">It's good to see you again, come in using your favourite social network</p>
            <div class="social-media__container">
    <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #48556D;"></i>
    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
    </span>
                <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #DF4D3B;"></i>
    <i class="fab fa-google-plus-g fa-stack-1x fa-inverse"></i>
    </span>
                <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #48556D;"></i>
    <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
    </span>
            </div>
            <fieldset class="form">
                <legend class="form__legend">OR</legend>
                <div action="" class="form__body form-login">
                    <input class="form__input" type="email" placeholder="username">
                    <input class="form__input" type="password" placeholder="password">
                    <button class="btn" type="submit">Sign in</button>
                </div>
            </fieldset>
        </div>

        <div class="switch">
            <div class="switch__text-container"  id="switch-text">
                <h1 class="switch__header header">Not yet a member?</h1>
                <p>Sign up and discover what we can do for you</p>
            </div>
            <button class="btn-white btn" id="switch-button">Sign up</button>
        </div>

        <div class="smooth signup hide-view" id="signup">
            <h1 class="signup__header header">Create a new account</h1>
            <p class="signup__byline">You can use your favourite social network</p>
            <div class="social-media__container">
    <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #48556D;"></i>
    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
    </span>
                <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #DF4D3B;"></i>
    <i class="fab fa-google-plus-g fa-stack-1x fa-inverse"></i>
    </span>
                <span class="fa-stack fa-lg social-media__icon icon">
    <i class="fas fa-circle fa-stack-2x" style="color: #48556D;"></i>
    <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
    </span>
            </div>
            <fieldset class="form">
                <legend class="form__legend">OR</legend>
                <div action="" class="form__body form-login">
                    <input class="form__input" type="email" placeholder="username">
                    <input class="form__input" type="password" placeholder="password">
                    <input class="form__input" type="password" placeholder="confirm password">
                    <button class="btn" type="submit">Sign up</button>
                </div>
            </fieldset>
        </div>

    </div>`
}