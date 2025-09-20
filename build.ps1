# Script para build do custom node para n8n
Write-Host "Build do TypeScript..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build da imagem Docker..." -ForegroundColor Yellow
    docker build -t n8n-custom .

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build do custom node concluido!" -ForegroundColor Green
        Write-Host "Para iniciar o n8n com nodes personalizados, execute: docker-compose up" -ForegroundColor Cyan
    } else {
        Write-Host "Falha na construcao do Docker!" -ForegroundColor Red
    }
} else {
    Write-Host "Falha na construcao do TypeScript!" -ForegroundColor Red
}
