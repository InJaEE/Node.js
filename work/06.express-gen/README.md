# express-generator 설정
```bash
# express 프로젝트를 만들 폴더로 이동하여 프로젝트 생성
express folderName --views=pug
# 프로젝트가 생성된 폴더로 이동하여 모듈 설치
npm i
# bin/www : 시작지점
# 각종 middleware 설치
npm i morgan #기본설치
npm i http-errors #기본설치
npm i sequelize
npm i sequelize-cli
npm i mysql2
npm i method-override
npm i rotating-file-stream
npm i multer
npm i express-session
npm i session-file-store
```