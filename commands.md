
### لحذف الملفات الكاش من CMD
find . -name "__pycache__" -type d -exec rm -r {} +  # (Linux/macOS)
Get-ChildItem -Path . -Recurse -Directory -Filter "__pycache__" | Remove-Item -Recurse -Force  # (Windows PowerShell)


### اعادن تحديث بنلء وثيقات apiت
python manage.py spectacular --color

###معرفة نوع المعالج 64- 32
 wmic cpu get caption


### 2. تفعيل WSL يدويًا

dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart