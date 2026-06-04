### Requirements
In the button's default state, when it is clicked, it goes into the loading state and a request is made to the provided back end API, which has a 50% chance of succeeding/failing.

Success response: If the request was successful, the button changes to the "Liked" state.
Failure response: Otherwise, it returns to the "Default"/"Hovered" state depending on whether the cursor is still over the button. The error message from the back end API should be shown below the button.
If the user clicks on a button in the "Liked" state, the reverse happens.

Submission API
URL: https://questions.greatfrontend.com/api/questions/like-button
HTTP Method: POST
Content Type: json
