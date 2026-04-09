@echo off
:: ============================================================
:: Cron job: Recordatorio de cumpleaños de mañana
:: Ejecutar cada día a las 10:00 hora España (configura en Plesk)
:: Plesk > Tareas programadas > Añadir tarea
::   Comando : C:\ruta\a\cron-birthdays.bat
::   Horario : 0 10 * * *  (si el servidor está en UTC+1/+2 ajustar)
:: ============================================================

set APP_URL=https://TU_DOMINIO.com
set CRON_SECRET=TU_CRON_SECRET

curl -s -o NUL -w "%%{http_code}" ^
  -X GET "%APP_URL%/api/cron/birthdays" ^
  -H "Authorization: Bearer %CRON_SECRET%"
