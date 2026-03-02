<?php
$filepath = 'c:\Users\inyma\OneDrive\Desktop\Ajith System Backup\inymart projects\Arsen Interior\react\new\backend\database\seeders\CmsDataSeeder.php';
$content = file_get_contents($filepath);

// Remove ANY whitespace or BOM before the opening <?php
$content = preg_replace('/^.*?<\?php/s', '<?php', $content);

file_put_contents($filepath, $content);
echo "File cleaned successfully.";
