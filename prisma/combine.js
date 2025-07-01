const fs = require('fs');
const files = [
  './prisma/base.prisma',
  './prisma/models/user.prisma',
  './prisma/models/post.prisma',
];

const combined = files
  .map((file) => fs.readFileSync(file, 'utf8'))
  .join('\n\n');
fs.writeFileSync('./prisma/schema.prisma', combined);