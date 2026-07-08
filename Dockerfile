FROM node:18-alpine

# نعمل فولدر جوه الحاوية
WORKDIR /app

# ننسخ ملفات الاعتماديات الأول
COPY package*.json ./

# ننزل المكتبات (Express)
RUN npm install

# ننسخ باقي كود التطبيق
COPY . .

# نفتح البورت اللي التطبيق شغال عليه
EXPOSE 3000

# أمر التشغيل أول ما الحاوية تفتح
CMD ["npm", "start"]
