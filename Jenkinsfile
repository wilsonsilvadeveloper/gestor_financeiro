pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  tools {
    nodejs 'NodeJS-22' // ou o nome da instalação do Node configurado no Jenkins
  }

  stages {
    stage('Clonar repositório') {
      steps {
        git 'https://github.com/wilsonsilvadeveloper/gestor_financeiro'
      }
    }

    stage('Instalar dependências') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build do projeto') {
      steps {
        sh 'npm run build'
      }
    }

    withCredentials([string(credentialsId: 'vercel-deplou-hook', variable: 'VERCEL_HOOK_URL')]) {
        sh 'curl -X POST "$VERCEL_HOOK_URL"'
    }
  }

  post {
    success {
      echo 'Build e deploy concluídos com sucesso!'
    }
    failure {
      echo 'Falha no pipeline.'
    }
  }
}
