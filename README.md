# Todo-App

## 1/ Requirements
      - Section 1: Đăng ký (Register)
         + Ứng dụng phải cung cấp chức năng đăng ký tài khoản cho người dùng mới.
         + Người dùng phải có thể điền thông tin cần thiết để đăng ký, bao gồm tên đăng nhập, mật khẩu và email.
         + Ứng dụng phải xác thực thông tin đăng ký của người dùng mới theo các quy tắc nhất định, chẳng hạn như độ dài tối thiểu của mật khẩu hoặc định dạng email hợp lệ.
         + Nếu thông tin đăng ký hợp lệ, ứng dụng phải tạo tài khoản mới cho người dùng và lưu thông tin đăng nhập của người dùng vào cơ sở dữ liệu.

      - Section 2: Đăng nhập (Login)
         + Ứng dụng phải cung cấp chức năng đăng nhập cho người dùng đã đăng ký.
         + Người dùng phải có thể nhập tên đăng nhập và mật khẩu để đăng nhập vào ứng dụng.
         + Ứng dụng phải xác thực thông tin đăng nhập của người dùng theo cách an toàn và hiệu quả.
         + Nếu thông tin đăng nhập hợp lệ, ứng dụng phải cho phép người dùng truy cập vào danh sách công việc cá nhân của mình và các chức năng quản lý công việc.
         
      - Section 3: Quản lý công việc (Todo App)
         +  Ứng dụng Todo App phải cho phép người dùng thêm, chỉnh sửa, xóa và đánh dấu các công việc cần làm trong danh sách công việc và phân trang cho Todo List.
         + Danh sách công việc phải hiển thị tên công việc, mô tả, thời gian tạo và trạng thái (đã hoàn thành hoặc chưa hoàn thành).
         + Ứng dụng còn cho phép người dùng tìm kiếm/lọc danh sách công việc theo trạng thái đã hoàn thành hoặc chưa hoàn thành.

## 2/ Folder Structure
      - Section 1: Frontend
         ``
         frontend/
         ├── node_modules
         ├── public
         ├── src/
         │   └── components (common)/
         │       ├── Header/
         │       │   ├── index.tsx
         │       │   └── style.module.scss
         │       ├── Footer/
         │       │   ├── index.tsx
         │       │   └── style.module.scss
         │       ├── FormField/
         │       │   ├── index.tsx
         │       │   └── style.module.scss
         │       ├── NotFound/
         │       │   ├── index.tsx
         │       │   └── style.module.scss
         │       └── index.ts (entry point)
         ├── screens/
         │   ├── TodoList/
         │   │   ├── components/
         │   │   │   ├── Title/
         │   │   │   │   ├── index.tsx
         │   │   │   │   └── style.module.scss
         │   │   │   ├── TodoItem/
         │   │   │   │   ├── index.tsx
         │   │   │   │   └── style.module.scss
         │   │   │   └── Paginate/
         │   │   │       ├── index.tsx
         │   │   │       └── style.module.scss
         │   │   ├── index.tsx
         │   │   └── style.module.scss
         │   ├── Login/
         │   │   ├── index.tsx
         │   │   └── style.module.scss
         │   ├── Register/
         │   │   ├── index.tsx
         │   │   └── style.module.scss
         │   └── index.ts (entry point)
         ├── App.tsx
         ├── App.scss
         ├── main.tsx
         └── index.css
         ``