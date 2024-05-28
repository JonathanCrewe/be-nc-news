\c nc_news_test

SELECT art.*, COUNT(com.comment_id)
FROM articles art 
LEFT JOIN comments com ON art.article_id = com.article_id
WHERE art.article_id = 12
GROUP BY art.article_id, art.title, art.topic, art.author, art.body, art.created_at, art.votes, art.article_img_url;
