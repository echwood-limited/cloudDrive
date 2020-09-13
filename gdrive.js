 
const {google} = require('googleapis')
const {GoogleAuth} = require('google-auth-library')
import fs from 'fs'
import readline from 'readline'

// const auth_client = new GoogleAuth()

const SCOPES = ['https://www.googleapis.com/auth/drive']

const TOKEN_PATH = 'token.json';
require('multer')



export default class GoogleDrive {
    constructor() {
      this.auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: SCOPES,
      })
  
      this.drive = google.drive({
        version: 'v2',
        auth: this.auth
      })
    }

    async listDrive(){
      const files = await this.drive.files.list({})
      return files.data.items
    } 
      

    static async uploadGDrive({title, mimeType}) {
      var fileMetadata = {
        title,
        'mimeType': 'application/vnd.google-apps.drive-sdk'
      };
      var media = {
        mimeType,
        body: fs.createReadStream('files/report.csv')
      };
      return await drive.files.insert({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      })
    }


//View will be done at the view 

    async destroyGDrive({req, res}, fileId) {
      
    }


    async downloadGDrive(fileId) {
      try{
        let buff = [];
        return await this.drive.files.get({
          fileId: fileId,
          alt: 'media'
        }, {responseType: 'stream'})
        .then(async res => {
          return await res.data.on('data', function(d) {
            buff.push(d);
          })
          .on('end', function () {
            const buffer = Buffer.concat(buff);
            return process.success({fileBuf: buffer}, 2000)
          })
          .on('error', function (err) {
            console.log('Error during download', err);
            return process.failed(1000)
          })
          
        })
      } catch(err) {
        console.log(err)
      }
    }






  // Authorize a client with credentials, then call the Google Drive API.
  

}