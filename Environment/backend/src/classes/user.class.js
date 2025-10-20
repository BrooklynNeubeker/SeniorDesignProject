//we WILL need a user class, so that we can have a function that returns
import UserSchema from '../models/user.model.js'
import Event from '../models/event.model.js'
//If attempting to fetch user data, make a null version of this class.
class User {
    constructor(email){
        this.email = email;
        this.fullname = null;
        this.password = null;
        this.profilePic = null;
        this.role = null;

    }
    //Current code will already create a user, so no createUser function implemented

    //Retrieve user information using email from the db and fill in the class information. 
    //Will also return the document if needed.
    async getExistingUser(){
        try {
            const userDoc = await UserSchema.find({email: this.email}); //find the user based on the email
        } catch(error) {
            console.error('Error fetching user document:', error);
        }

        this.fullname = userDoc.fullname; // Update class information
        // this.password = userDoc.password;
        this.profilePic = userDoc.profilePic;
        this.role = userDoc.role;
        return userDoc;
    }

    //Get all events associated with the current user's ID:
    //Returns an array of documents that match the userID, getting us a list of event documents created by this user.
    async getEvents(userID){
        try {
            const events = await Event.find({eventCoordinatorID: userID});
            console.log('Events found:', events);
            return events;
        } catch(error){
            console.error('Error finding events:', error);
        }
    }
    
}

