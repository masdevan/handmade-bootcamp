1. npx prisma generate
2. npx prisma migrate dev -> isi nama first migration ( bebas )
3. kalau mau nambah migrasi , tambah aja schema nya nanti jalankanm ulang nomer 1 dan 2
4. untuk seeder pakai npx prisma db seed


auth:
1. untuk login langsung tidak pakai api, dikarenakan oakai next auth
2. untuk register endpoint localhost:3000/api/auth/register ( jangan lupa ulangi no 1 lagi dikarenakan saya ubah strukturnya)
{
  "name": "Guntur",
  "email": "guntur@mail.com",
  "password": "password123",
  "phone": "08123456789"
}
3. untuk forgot password api nya localhost:3000/api/auth/forgot-password
{
  "email": "guntur@mail.com"
}
4 untuk reset password api nya localhost:3000/api/auth/reset-password
{
  "token": "5ba365020ebfdb3ba538ddbc7b6ff523e909188d72ca228381c8f28705b3abac",
  "newPassword": "11111",
}
