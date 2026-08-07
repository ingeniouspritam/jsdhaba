$nodePath = 'C:\Program Files\nodejs\node.exe'
$env:PATH = "$env:PATH;C:\Program Files\nodejs"
[Environment]::SetEnvironmentVariable('PATH', $env:PATH, 'User')
Write-Output "Node path configured"
