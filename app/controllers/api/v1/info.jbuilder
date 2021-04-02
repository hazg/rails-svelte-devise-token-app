user = get_user
if user
  json.id user.id
  json.name user.name
  json.email user.email
  # json.role user.role
  # json.role_settings user.role.to_settings_hash
  # json.free_balance user.free_balance
else
  json.not_signed
end