┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION ROUTES                                │
├─────────────┬─────────────────────────┬─────────────────────────────────────┤
│ METHOD      │ ENDPOINT                │ WHAT IT DOES                        │
├─────────────┼─────────────────────────┼─────────────────────────────────────┤
│ POST        │ /register               │ Create new customer account         │
│ POST        │ /login                  │ Login and get JWT token             │
│ POST        │ /logout                 │ Logout and invalidate token         │
│ GET         │ /me                     │ Get current logged-in user profile  │
│ PUT         │ /profile                │ Update user profile                 │
│ PUT         │ /change-password        │ Change password                     │
│ POST        │ /forgot-password        │ Send password reset email           │
│ POST        │ /reset-password         │ Reset password with token           │
│ POST        │ /refresh-token          │ Get new access token                │
│ POST        │ /verify-email/:token    │ Verify email address                │
├─────────────┼─────────────────────────┼─────────────────────────────────────┤
│ ADMIN ONLY  │                         │                                     │
├─────────────┼─────────────────────────┼─────────────────────────────────────┤
│ GET         │ /admin/users            │ List all system users               │
│ GET         │ /admin/users/:id        │ Get specific user details           │
│ POST        │ /admin/users            │ Create new staff user               │
│ PUT         │ /admin/users/:id/role   │ Update user role                    │
│ PUT         │ /admin/users/:id/status │ Activate/deactivate user            │
│ DELETE      │ /admin/users/:id        │ Delete user                         │
└─────────────┴─────────────────────────┴─────────────────────────────────────┘"# kulan-sport-store-system-backend-" 
"# kulan-sport-store-system-backend-" 
"# kulan-sport-store-system-backend-" 
"# kulan-sport-store-system-backend-" 
