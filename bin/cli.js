#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const fs = require('fs-extra'); 

const program = new Command();

program
  .name('dockpress')
  .version('1.0.0')
  .description('CLI untuk setup Express dengan Docker')
  .argument('<project-name>', 'Nama proyek Express kamu')
  .action(async (projectName) => {
    const targetDir = path.join(process.cwd(), projectName);
    const templateDir = path.join(__dirname, '../template');

    try {
      
      if (fs.existsSync(targetDir)) {
        console.error(`❌ Error: Folder "${projectName}" sudah ada!`);
        process.exit(1);
      }

      
      await fs.copy(templateDir, targetDir);
      
      console.log(`🚀 Proyek ${projectName} berhasil dibuat dengan Docker!`);
    } catch (err) {
      console.error('❌ Gagal membuat proyek:', err);
    }
  });

program.parse(process.argv);