# NestJS Project Structure (Easy Hinglish)

## 1. dist Folder

* `dist` folder me compiled code store hota hai.
* Jo TypeScript code hum `src` folder me likhte hain, wo JavaScript me convert hokar yahan aata hai.
* Production me server isi code ko run karta hai.
* End users indirectly isi code ko access karte hain.

**Simple:** `src` = Hum likhte hain, `dist` = Server chalata hai.

---

## 2. node_modules Folder

* Is folder me project ki saari dependencies/packages store hoti hain.
* Jab hum `npm install` chalate hain to packages yahan download hote hain.
* NestJS aur doosri libraries bhi isi folder me hoti hain.

**Simple:** Project ke liye required sab packages ka store room.

---

## 3. src Folder

* Ye project ka sabse important folder hai.
* Isme application ka actual source code hota hai.
* Developer apna sara code isi folder me likhta hai.

**Simple:** Yahi wo jagah hai jahan hum coding karte hain.

---

## 4. app.controller.spec.ts

* Ye testing file hai.
* Iska use `app.controller.ts` ko test karne ke liye hota hai.
* Check karta hai ki controller sahi kaam kar raha hai ya nahi.

**Simple:** Controller ka exam lene wali file.

---

## 5. app.controller.ts

* Controller incoming requests ko handle karta hai.
* User request bhejta hai to sabse pehle controller receive karta hai.
* Fir response return karta hai.

**Simple:** User aur application ke beech ka traffic police.

---

## 6. app.module.ts

* Ye application ka main module hota hai.
* Saare controllers aur services ko register karta hai.
* NestJS app yahin se organize hoti hai.

**Simple:** Pure project ka manager.

---

## 7. app.service.ts

* Is file me business logic likhte hain.
* Data process karna, calculations karna, database se baat karna, etc.

**Simple:** Application ka actual kaam karne wala worker.

---

## 8. main.ts

* Ye application ka entry point hai.
* NestJS server yahin se start hota hai.
* Sabse pehle ye file execute hoti hai.

**Simple:** Project ka main gate ya starting point.

---

## 9. test Folder

* Is folder me test cases rakhe jaate hain.
* Application ke different parts ko test karne ke liye use hota hai.
* Ensure karta hai ki code sahi kaam kar raha hai.

**Simple:** Project ki quality check karne wala folder.

---

10. esliint.config.ts
- used for linting the code and maintaining code quality.
- Yeh indentation, syntax errors, aur coding standards ko check karta hai.
- Code ko clean aur error-free banane me madad karta hai.

11. nest-cli.json
- NestJS CLI ke configuration file hai.
- Isme project ke structure aur settings define kiye jaate hain.
- CLI commands ke behavior ko customize karne ke liye use hota hai.
- Is file me build, start, aur test commands ke configurations hoti hain.

## 12. tsconfig.build.json

- Ye TypeScript build configuration file hai.
- Jab project build hota hai (`npm run build`), tab ye file use hoti hai.
- Isme build ke liye special settings hoti hain.
- Batata hai ki compiled JavaScript code kahan save hoga aur kaise generate hoga.

**Simple:** Build process ke rules store karta hai.

**Example:**
- Output folder (`dist`)
- Target JavaScript version
- Build ke time kin files ko include/exclude karna hai

---

## 13. tsconfig.json

- Ye TypeScript ki main configuration file hai.
- Project ke saare TypeScript rules yahan define hote hain.
- Compiler ko batata hai ki code ko kaise compile karna hai.
- Development aur build dono me use hoti hai.

**Simple:** TypeScript ka settings manager.

**Example:**
- JavaScript version select karna
- Type checking rules
- Include/Exclude files
- Module system define karna

---


### Easy Yaad Rakhne Ka Tarika

- **tsconfig.json** → TypeScript ka main settings file ⚙️
- **tsconfig.build.json** → Build ke liye special settings file 🏗️

# Easy Flow

User Request
↓
Controller (`app.controller.ts`)
↓
Service (`app.service.ts`)
↓
Response
↓
User

`main.ts` → App Start karta hai
`app.module.ts` → Sabko connect karta hai
`src` → Development Code
`dist` → Production Code
`node_modules` → Installed Packages
`test` → Testing Files