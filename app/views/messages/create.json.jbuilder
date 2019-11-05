json.(@message, :content, :image)
json.content  @message.content
json.user_name @message.user.name
json.data @message.created_at
json.id @message.id
json.image @message.image