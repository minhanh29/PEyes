# PEyes - Text Recognition App
Author: *Minh Anh Nguyen*  
A React Native project that perfroms text detection on images using Cloud Vision API. 

## Installation
### For Testing
1. **For Android**: Download and install the **peyes.apk** file in the **release** directory on your android.
(Remember to enable allowing install from unknown sources)  

2. **For IOS**: Not yet available.

### For Developing
1. Clone the project

```
mkdir PEyes
git clone https://github.com/minhanh29/PEyes.git
```

2. Install dependencies

```
npm install
```

3. Run the project (make sure you have an emulator running or a phone connected)

```
react-native run-android
(or) react-native run-ios
```

## Functionalities
### Authentication
You have to create an account before using PEyes  
<img src="screenshots/auth.png" alt="authentication" width='300' />
<img src="screenshots/account.png" alt="account screen" width='298' />

### Image Capturing and Cropping
A fully functioning camera to capture real time images.  
Moreover, you can also choose an image from your gallery.  
The captured or chosen image can be cropped, rotated, or scaled to give better text detection performance.  
<img src="screenshots/camera.png" alt="camera" width='300' />
<img src="screenshots/crop.png" alt="crop" width='300'/>

### Editing and Saving
The generated text can be manually editted and saved as a Word Document.  
The Word document can be sent to your registed email so that you can download it frorm your PC.  
<img src="screenshots/edit.png" alt="edit" width='300' />
<img src="screenshots/saving.png" alt="saving" width='292' />

### Document Management
PEyes allows you to store, search, and delete documents.  
<img src="screenshots/gallery.png" alt="gallery" width='350'/>
<img src="screenshots/selection.png" alt="selection" width='350'/>

### Account Updating
Update your default email (to which the document is sent) and passwords anytime
<img src="screenshots/email.png" alt="email" width='300' />
<img src="screenshots/password.png" alt="password" width='300' />
