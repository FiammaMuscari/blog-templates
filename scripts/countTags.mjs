import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'path', 'to', 'your', 'posts');

function countTags() {
    const tagsCount = {};

    const files = fs.readdirSync(postsDirectory);

    files.forEach((file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const regex = /tags:\s\[(.*?)\]/;
        const match = regex.exec(fileContent);

        if (match && match[1]) {
            const tags = match[1].split(',').map((tag) => tag.trim().replace(/'/g, ''));
            tags.forEach((tag) => {
                tagsCount[tag] = (tagsCount[tag] || 0) + 1;
            });
        }
    });

    return tagsCount;
}

const tagsCount = countTags();
fs.writeFileSync('app/tag-data.json', JSON.stringify(tagsCount, null, 2));

console.log('Tags count updated successfully.');
