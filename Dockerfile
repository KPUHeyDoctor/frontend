# 이미지 생성
FROM node:14-alpine

# 앱 디렉토리 생성 및 설정
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# 앱 의존성 설치
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install --silent

# 앱 소스코드 복사
COPY . /app

# 빌드
RUN npm run build

# 앱 실행
CMD ["npm", "start"]
