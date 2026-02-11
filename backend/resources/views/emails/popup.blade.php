<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Popup Form Enquiry</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
        <td align="center">

            <!-- Email Container -->
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 5px 20px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                    <td style="background:#111827; padding:20px 30px;">
                        <h1 style="margin:0; font-size:20px; color:#ffffff; letter-spacing:1px;">
                            New Popup Enquiry
                        </h1>
                        <p style="margin:6px 0 0; color:#9ca3af; font-size:13px;">
                            A new message has been received from your website
                        </p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:30px;">

                        <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#374151;">
                            
                            <tr>
                                <td width="30%" style="padding:8px 0; font-weight:bold;">Name</td>
                                <td width="70%" style="padding:8px 0;">{{ $data['name'] }}</td>
                            </tr>

                            <tr>
                                <td style="padding:8px 0; font-weight:bold;">Email</td>
                                <td style="padding:8px 0;">{{ $data['email'] }}</td>
                            </tr>

                            <tr>
                                <td style="padding:8px 0; font-weight:bold;">Phone</td>
                                <td style="padding:8px 0;">{{ $data['phone'] ?? 'N/A' }}</td>
                            </tr>

                          

                        </table>

                        <!-- Message Box -->
                        <div style="margin-top:25px;">
                            <p style="margin:0 0 8px; font-weight:bold; color:#111827;">
                                Message
                            </p>
                            <div style="background:#f9fafb; border-left:4px solid #111827; padding:15px; line-height:1.6; color:#374151;">
                                {{ $data['description'] }}
                            </div>
                        </div>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background:#f9fafb; padding:15px 30px; text-align:center;">
                        <p style="margin:0; font-size:12px; color:#6b7280;">
                            This enquiry was sent from your website contact form.
                        </p>
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
