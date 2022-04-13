# Demo Spartacus - Use CMS Data When Replacing Slots

This is a demo that shows how custom global messages can be added to Spartacus.

The [_src/app/custom_ folder](./src/app/custom) includes models that augment _@spartacus/core_ to allow new message types, an injection token that provides the custom types, a component that displays the custom messages, and a handler that adds a global message with a new type for `418` errors.

The `AppModule`has 4 providers:

- A config for the new global message types
- A custom outlet to render the new `MessagesComponent`
- `TeapotHandler` as a new `HttpErrorHandler`
- An `APP_INITIALIZER` to make a request to an endpoint that will return a 418 error response

**Important Note:** _@spartacus/core_ is patched to use interfaces instead of type aliases (`GlobalMessageTypeConfig`) or object literals (`GlobalMessageConfig`) to make them augmentable. Please check [the patch file](./patches/@spartacus+core+4.3.1.patch) to see the diff.
