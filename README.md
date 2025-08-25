# File share

A simple file sharing application through local networks.

## Functions

- Receivers can download shared files by selecting each one that wants to download.
- Receiver can download all the files as a zip file by clicking on the download icon following to the Folder Name.
- Sender can share the files among any number of people who have connected the same Network.

## Installation

Clone or download the project.

```
git clone https://github.com/chamathAn/File-Share.git
```

## Usage

1. Install the packges

```
bun install
```

2. Copy the folder path that you need to share and paste it in `src/index.ts` file.
   > _Note_ : Don't add any file names at the end of the file path. Copy only the path of the folders

```typescript
const FILE_PATH = "Your file path goes here";
```

3. Give permission to `8080` port in sender's computer's firewall.
4. Share the url showing in application running terminal with your friends to download the files.
5. Delete the zip file that has been created in `temp/` directory after sharing is done.

![File Share](https://github.com/user-attachments/assets/cccf4e02-ac37-4ce5-919f-9ca8d3409299)
