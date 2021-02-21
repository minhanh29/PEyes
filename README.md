# PEyes
Author: *Minh Anh Nguyen*  
A React Native project that perfroms text detection on images using Cloud Vision API. 

## Installation
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

<img src="screenshots/auth.png" alt="authentication" width='500' />

### Image Capturing
A fully functioning camera to capture real time images.  
You can also choose an image from your gallery

<img src="screenshots/camera.png" alt="camera" width='500' />

### Image Cropping
The captured or chosen image can be cropped, rotated, or scaled to give better text detection performance.

<img src="screenshots/crop.png" alt="crop" width='500'/>

### Editing and Saving
The generated text can be manually editted and saved as a Word Document

<img src="screenshots/edit.png" alt="edit" width='300' />
<img src="screenshots/saving.png" alt="saving" width='300' />

### Email Sending
The Word document can be sent to your registed email so that you can download it frorm your PC.

<img src="screenshots/email.png" alt="email" width='500'/>
