<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Credentials Changed</title>
    <style>
        body { margin: 0; padding: 0; background: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: #022C22; padding: 36px 40px; text-align: center; }
        .header img { height: 48px; }
        .header h1 { color: #DFA45B; font-size: 22px; font-weight: 900; margin: 16px 0 0; letter-spacing: 0.04em; text-transform: uppercase; }
        .alert-banner { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 24px; font-size: 13px; color: #92400e; font-weight: 600; }
        .body { padding: 36px 40px; }
        .label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
        .value { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 20px; word-break: break-all; }
        .divider { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
        .change-badge { display: inline-block; background: #ecfdf5; color: #065f46; border: 1px solid #6ee7b7; border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 700; margin: 2px 3px 2px 0; }
        .security-box { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; padding: 18px 20px; margin-top: 24px; }
        .security-box p { margin: 0; font-size: 13px; color: #92400e; line-height: 1.6; }
        .security-box strong { color: #7c2d12; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 40px; text-align: center; font-size: 11px; color: #94a3b8; }
        .footer a { color: #DFA45B; text-decoration: none; }
        .meta-row { display: flex; gap: 12px; flex-wrap: wrap; background: #f8fafc; border-radius: 10px; padding: 14px 18px; margin-top: 20px; }
        .meta-item { flex: 1; min-width: 120px; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>🔐 Security Alert</h1>
    </div>

    <div class="alert-banner">
        ⚠️ Admin credentials were changed on your Arsen Interior CMS. If this was not you, take immediate action.
    </div>

    <div class="body">
        <p style="color:#475569; font-size:14px; margin-top:0;">
            The following credential changes were made to the admin account on <strong>{{ $changedAt }}</strong>:
        </p>

        <div>
            @foreach(explode(', ', $changeList) as $change)
                <span class="change-badge">{{ trim($change) }}</span>
            @endforeach
        </div>

        <hr class="divider">

        <div class="label">Account Name</div>
        <div class="value">{{ $newName }}</div>

        <div class="label">Login Email (Username)</div>
        <div class="value">{{ $newEmail }}</div>

        @if(str_contains($changeList, 'Password'))
        <div class="label">Password</div>
        <div class="value" style="color:#059669;">✔ Password was changed. A new secure password is now in effect.</div>
        @endif

        <div class="meta-row">
            <div class="meta-item">
                <div class="label">Request IP</div>
                <div class="value" style="font-size:13px; margin-bottom:0;">{{ $ip }}</div>
            </div>
            <div class="meta-item">
                <div class="label">Changed At</div>
                <div class="value" style="font-size:13px; margin-bottom:0;">{{ $changedAt }}</div>
            </div>
        </div>

        <div class="security-box">
            <p>
                <strong>🛡 Security Notice:</strong> All active admin sessions have been <strong>terminated</strong>.
                The updated credentials must be used for the next login.<br><br>
                If you did <strong>not</strong> authorise this change, contact your system administrator immediately and reset access.
            </p>
        </div>
    </div>

    <div class="footer">
        This is an automated security notification from <a href="https://arseninterior.in">arseninterior.in</a>.
        Do not share this email with anyone. &copy; {{ date('Y') }} Arsen Interior.
    </div>
</div>
</body>
</html>
