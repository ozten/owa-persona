# Open Web App Persona

This library allows easy use of Persona from an Open Web App.

Two components are provided:

* A static online library which can be put into your app cache manifest
* A set of assets which must be hosted on your website.

The static library is under the `owa` directry.

The website assets are under the `www` library.

## Why?

This project gives you a Persona sign in button.
Once a user is signed in, it gives you a sign out button.

It handles all the bookkeeping of crossing between your Open Web App and your website.

## Usage

In your Open Web App, you include the following script file

    <script src="/owa_persona.js"></script>

Of course, you may add this to your `cache.manifest` file.
You should put this file into your build system, if you have one.

Somewhere in your App's JavaScript, you should initialize it as follows:

    var persona = new OWAPersona({
        iframe: 'http://example.com/authentication.html',
        postAssertion: 'http://example.com/verify_persona_assertion',
        siteName: 'Example Website',
        termsOfService: 'http://example.com/tos.html',
        privacyPolicy: 'http://example.com/privacy.html'
    }

    persona.watch({
        loggedInUser: currentUser(),
        onlogin: function(email) {

        },
        onlogout: function() {

        }
    });


This API may seem familiar... It is largely the `navigator.id.watch` API, with a few tweaks.

The first interesting difference is the `postAssertion` parameter. This is the URL where you will accept `POST` requests to verify an assertion. More details in a moment, let's cover other deviations.

The `OWAPersona` constructor takes all the same parameters as the `navigator.id.request` function.

There is no `navigator.id.request` like function.
This is because owa-persona manages the authentication widgets such as sign in button, sign out button, etc.

Next up is `watch` which takes the same parameters as `navigator.id.watch`.

Note that the `onlogin` callback to watch gives us the user's email, instead of an `assertion`.

## postAssertion API

The reason `onlogin` can give us the user's email address, is because you will write server side code which processes the user's assertion and returns JSON in a very specific way.

We'll give Node.js sample code, but any programming language can provide the `postAssertion` endpoint.

The URL you put in `postAssertion` should accept a POST with a `application/x-www-form-urlencoded` encoded body. It should return a JSON object with `application/json` encoding with a `status` and `email` field.

Status should be `okay` if everything checked out. Otherwise `failure`.

Note: The inputs and outputs are the same as the inputs and outputs of the [remote verification API](https://developer.mozilla.org/en-US/docs/Mozilla/Persona/Remote_Verification_API?redirectlocale=en-US&redirectslug=Persona%2FRemote_Verification_API), except your server side code will add `audience`.

    ...
    app.post('/verify_persona_assertion', function(req, res) {
      var params = {
        audience: config('audience'),
        assertion: req.body.assertion
      }
      res.send(verifier(params));
    });