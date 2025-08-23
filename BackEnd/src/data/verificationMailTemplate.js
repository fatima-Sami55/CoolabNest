const htmlContent = (verificationLink, userName) => {
  return `
    <div style="
      font-family: 'Segoe UI', Roboto, sans-serif;
      max-width: 500px;
      margin: auto;
      border-radius: 10px;
      padding: 30px;
      background: #ffffff;
      color: #333;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    ">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #2c3e50; margin-bottom: 10px;">Welcome, ${userName}! 🎉</h2>
        <p style="font-size: 15px; color: #555;">
          Thanks for signing up. Let’s confirm your email so you can get started.
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="
          background: linear-gradient(90deg, #4e54c8, #8f94fb);
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
        ">✅ Verify My Email</a>
      </div>

      <p style="font-size: 14px; color: #777; line-height: 1.5;">
        This link will expire in <strong>24 hours</strong>.<br>
        If you didn’t create an account, you can safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} CollabNest. All rights reserved.
      </p>
    </div>
  `;
};

export default htmlContent;
