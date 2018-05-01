# messagef-cyberbullying-thai
final project MESSAGE FILTERING

- botclassify.js = main
- comparefeature.js = สำหรับเทียบ feature จริงๆ กับ feature ปลอมๆ เช่น twitter:a1 facebook:b2 (ทั้งหมด 4974 features)
- classification.jar = สำหรับเรียก Model เพื่อ classify
- connectdb.js = ติดต่อกับ database และ insert message+prediction result ลงใน database
- callweka.js = เรียกไฟล์ classification.jar แล้วรับค่า predict จากไฟล์จาวา
