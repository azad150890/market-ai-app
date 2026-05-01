#output "function_url" {
#  value = azurerm_linux_function_app.func.default_hostname
#}

output "frontend_url" {
  value = azurerm_static_web_app.frontend.default_host_name
}
output "function_url" {
  value = "https://${azurerm_linux_function_app.func.default_hostname}"
}