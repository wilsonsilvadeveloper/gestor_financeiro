pipeline {
  agent any

  tools {
    nodejs 'NodeJS-22'
  }

  environment {
    GIT_REPO = 'https://github.com/wilsonsilvadeveloper/gestor_financeiro.git'
  }

  stages {
    stage('Instalar Dependências') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build do Projeto') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Merge para main') {
      when {
        branch 'development'
      }
      steps {
        sh '''
        git config user.name "wilsonsilvadeveloper"
        git config user.email "wilsonoficial.com@gmail.com"
        git checkout main
        git merge origin/development --no-ff -m "Merge automático via Jenkins"
        git push origin main
        '''
      }
    }
  }
}
