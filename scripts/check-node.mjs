const [major] = process.versions.node.split('.').map(Number);

if (major < 22) {
  console.error(
    `\n❌ Node ${process.versions.node} detectado. Este proyecto requiere Node >= 22.12.\n` +
      `   Ejecuta: nvm use\n` +
      `   Luego: npm install && npm run dev\n`,
  );
  process.exit(1);
}
